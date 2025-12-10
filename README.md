# GOOD ONES — Platform

GOOD ONES is a Distribution + Radio Promo platform built as a modern full-stack application.

This repository contains:

- **Backend** — NestJS + PostgreSQL  
- **Frontend** — Next.js 14  
- **Radio Promo Tools** — Fake PlayMPE client + payload generator  
- **Distribution pipeline** — jobs + status tracking  
- **Analytics module** — events + radio performance overview  

---

## Backend (NestJS)

NestJS + PostgreSQL backend for:

- Labels & Users management  
- Releases & Tracks  
- Digital Distribution (DistributionJobs)  
- Radio Promo (RadioCampaigns) + Fake PlayMPE client  
- Analytics (event tracking + radio overview)  

Backend lives in:  
`/backend`

---

## Frontend (Next.js)

Next.js 14 + TailwindCSS frontend providing:

- Login & auth token management  
- Releases dashboard  
- Distribution workflow  
- Radio Campaign creation UI  
- Basic analytics visualisation  

Frontend lives in:  
`/frontend`

---

## Local development

Make sure Docker is installed.

### Start backend + database

```bash
cd backend
cp .env.example .env
docker compose up --build
