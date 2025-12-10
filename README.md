GOOD ONES Platform — Distribution & Radio Promo

Modular platform built for independent labels, combining:

Digital distribution tools

Radio promotion workflows

Releases & metadata management

Analytics overview

The stack includes:

Backend — NestJS + PostgreSQL + TypeORM

Frontend — Next.js 14 + TailwindCSS

Docker environment for local development

Subprojects
🔧 Backend (/backend)

NestJS API providing:

Auth + JWT

Labels & Users

Releases & Tracks

Distribution Jobs (async)

Radio Campaigns

Analytics module

➡️ See: /backend/README.md

🎨 Frontend (/frontend)

Next.js 14 web client:

Login

Releases dashboard

Distribution workflows

Radio Campaigns UI

Basic analytics

➡️ See: /frontend/README.md

Development
Run backend:
cd backend
npm install
npm run start:dev
# Runs on http://localhost:3001

Run frontend:
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000


© GOOD ONES Platform — MVP
