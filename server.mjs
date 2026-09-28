import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };
const sendJson = (res, status, value) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(value)); };
const readBody = (req) => new Promise((resolve, reject) => { let body=''; req.on('data', chunk => { body += chunk; if (body.length > 20_000) reject(new Error('Request too large')); }); req.on('end', () => resolve(body)); req.on('error', reject); });
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/runtime-config.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(`window.CAMPUS_RUNTIME=${JSON.stringify({ googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '' })};`);
    return;
  }
  if (url.pathname === '/api/ask' && req.method === 'POST') {
    try {
      const { question } = JSON.parse(await readBody(req));
      if (typeof question !== 'string' || !question.trim() || question.length > 2000) return sendJson(res, 400, { error: 'Please enter a short question.' });
      if (!process.env.GEMINI_API_KEY) return sendJson(res, 503, { error: 'Gemini is not configured. Add GEMINI_API_KEY to your environment, then restart Campus OS.' });
      const prompt = `You are Campus OS for MSRIT. Give concise answers. Never invent campus facts. Say you cannot verify a fact if it is not supported. Question: ${question.trim()}`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || 'gemini-2.5-flash'}:generateContent`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
      const payload = await response.json();
      if (!response.ok) return sendJson(res, 502, { error: payload?.error?.message || 'Gemini could not answer right now.' });
      const answer = payload?.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
      return sendJson(res, 200, { answer: answer || 'I could not generate a response.' });
    } catch { return sendJson(res, 500, { error: 'Campus OS could not reach Gemini right now.' }); }
  }
  let file = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  file = normalize(file).replace(/^([.][.][\\/])+/, '');
  try {
    const body = await readFile(join(root, file));
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(body);
  } catch {
    const body = await readFile(join(root, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(body);
  }
}).listen(process.env.PORT || 3000, () => console.log(`Campus OS running on http://localhost:${process.env.PORT || 3000}`));
