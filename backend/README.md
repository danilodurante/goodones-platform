# GOOD ONES — Backend

NestJS + PostgreSQL backend for:

- Labels & Users management  
- Releases & Tracks  
- Digital Distribution (DistributionJobs)  
- Radio Promo (RadioCampaigns) + Fake PlayMPE client  
- Analytics (event tracking + radio overview)  

---

## Tech stack

- Node.js 18+
- NestJS
- TypeORM
- PostgreSQL
- JWT auth
- Docker (optional)

---

## Local setup (for developers)

```bash
npm install
npm run start:dev
http://localhost:3001
```

---

## Environment variables (`.env` example)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=goodones
JWT_SECRET=dev-secret
```

---

## Main modules included

- AuthModule  
- UsersModule  
- LabelsModule  
- ReleasesModule  
- DistributionModule  
- RadioCampaignsModule  
- AnalyticsModule  

---

© GOOD ONES Platform — MVP Backend
