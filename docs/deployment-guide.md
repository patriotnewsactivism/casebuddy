# CaseBuddy Deployment Guide

## Overview

This guide provides instructions for deploying CaseBuddy in both development and production environments. It covers environment setup, database configuration, API key management, and deployment options.

## Development Environment

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- SQLite (included)

### Setup Steps

1. **Clone the repository**:
   ```bash
   gh repo clone patriotnewsactivism/casebuddy
   cd casebuddy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the project root with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```

4. **Initialize the database**:
   ```bash
   npm run db:migrate
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Access the application**:
   Open your browser and navigate to `http://localhost:5000`

### Testing

1. **Run tests**:
   ```bash
   npm test
   ```

2. **Test AI features without API key**:
   If you don't have an Anthropic API key, the application will use mock data for AI features.

## Production Environment

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- PostgreSQL 14.x or later
- Nginx or another reverse proxy (recommended)

### Database Setup

1. **Install PostgreSQL**:
   Follow the installation instructions for your operating system from the [PostgreSQL website](https://www.postgresql.org/download/).

2. **Create a database**:
   ```sql
   CREATE DATABASE casebuddy;
   CREATE USER casebuddy_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE casebuddy TO casebuddy_user;
   ```

3. **Update environment variables**:
   Add the following to your `.env` file:
   ```
   DATABASE_URL=postgresql://casebuddy_user:your_password@localhost:5432/casebuddy
   ```

4. **Migrate the database**:
   ```bash
   npm run db:migrate:prod
   ```

### API Key Configuration

1. **Obtain an Anthropic API key**:
   Sign up at [Anthropic](https://www.anthropic.com/) and get an API key.

2. **Set the API key**:
   Add to your `.env` file:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```

3. **Configure API key rotation** (optional):
   For enhanced security, set up a key rotation schedule and update the environment variable accordingly.

### Authentication Setup

1. **Configure authentication**:
   Update the authentication settings in `server/auth.ts` to enable authentication for all endpoints.

2. **Set authentication environment variables**:
   Add to your `.env` file:
   ```
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=86400
   ```

### Build and Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

3. **Configure Nginx** (recommended):
   Create a new Nginx configuration file:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable HTTPS** (recommended):
   Use Let's Encrypt to obtain SSL certificates and update your Nginx configuration.

### Docker Deployment (Alternative)

1. **Build the Docker image**:
   ```bash
   docker build -t casebuddy .
   ```

2. **Run the container**:
   ```bash
   docker run -p 5000:5000 --env-file .env casebuddy
   ```

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 5000 | No |
| NODE_ENV | Environment (development/production) | development | No |
| DATABASE_URL | PostgreSQL connection string | - | Yes (production) |
| ANTHROPIC_API_KEY | Anthropic API key | - | No (uses mock data if missing) |
| JWT_SECRET | Secret for JWT tokens | - | Yes (production) |
| JWT_EXPIRATION | JWT token expiration in seconds | 86400 | No |

## Scaling Considerations

### Database Scaling

- For high-traffic applications, consider implementing database connection pooling
- Set up database replication for read-heavy workloads
- Implement proper indexing for frequently queried fields

### API Rate Limiting

- Configure rate limiting for the Anthropic API to avoid exceeding quotas
- Implement caching for AI analysis results to reduce API calls

### Load Balancing

- For high-traffic applications, deploy multiple instances behind a load balancer
- Configure session affinity if needed

## Monitoring and Logging

1. **Application Logs**:
   - Logs are written to `server-logs.txt` by default
   - Consider integrating with a log management service for production

2. **Error Tracking**:
   - Implement error tracking with services like Sentry
   - Configure alerts for critical errors

3. **Performance Monitoring**:
   - Monitor server resources (CPU, memory, disk)
   - Track API response times and error rates

## Backup and Recovery

1. **Database Backups**:
   - Set up regular PostgreSQL backups
   - Store backups in a secure, off-site location

2. **Application Data**:
   - Implement backup procedures for uploaded documents
   - Test recovery procedures regularly

## Security Considerations

1. **API Key Security**:
   - Never commit API keys to version control
   - Rotate API keys regularly
   - Use environment variables for sensitive information

2. **Authentication**:
   - Implement proper authentication for all endpoints
   - Use HTTPS for all communications
   - Set secure and HTTP-only flags for cookies

3. **Input Validation**:
   - Validate all user inputs
   - Implement proper error handling
   - Protect against common web vulnerabilities (XSS, CSRF, etc.)

## Troubleshooting

### Common Issues

1. **Server won't start**:
   - Check if the port is already in use
   - Verify environment variables are set correctly
   - Check for syntax errors in configuration files

2. **Database connection errors**:
   - Verify database credentials
   - Check if the database server is running
   - Ensure the database exists and is accessible

3. **AI features not working**:
   - Verify the Anthropic API key is valid
   - Check API rate limits
   - Look for errors in the server logs

### Getting Help

- Open an issue on the GitHub repository
- Check the documentation for updates
- Contact the development team for support