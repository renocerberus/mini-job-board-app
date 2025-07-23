# 🚀 Mini Job Board App

A modern, responsive job board application built with Next.js 15, TypeScript, and Supabase. Find your next career opportunity or post job openings with an intuitive and beautiful interface.

![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2.39.7-green?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔍 Job Search & Discovery
- **Advanced Search**: Search jobs by title, company name, or keywords
- **Smart Filtering**: Filter by job type (Full-time, Part-time, Contract) and location
- **Real-time Results**: Instant search results with pagination
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 👤 User Experience
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Job Details**: Comprehensive job information with company details
- **Easy Navigation**: Seamless browsing experience with breadcrumbs
- **Loading States**: Smooth loading indicators for better UX

### 🏢 Company Features
- **Company Profiles**: Dedicated company pages and information
- **Job Posting**: Easy job creation and management interface
- **Dashboard**: Company dashboard for managing job postings

### 🔐 Authentication & Security
- **User Authentication**: Secure sign-up and sign-in functionality
- **Protected Routes**: Role-based access control
- **Supabase Integration**: Robust backend with real-time capabilities

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4 with custom design system
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Icons**: Feather Icons React
- **Date Handling**: date-fns
- **Development**: ESLint, Turbopack for fast development

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** or **pnpm** or **bun**
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mini-job-board-app.git
cd mini-job-board-app
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Create the environment file
touch .env.local
```

Add the following environment variables to `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Supabase Setup

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in to your account
   - Create a new project

2. **Get Your Credentials**:
   - Navigate to Settings → API
   - Copy your Project URL and anon/public key
   - Paste them into your `.env.local` file

3. **Database Schema** (Optional - for full functionality):
   ```sql
   -- Create jobs table
   CREATE TABLE jobs (
     id SERIAL PRIMARY KEY,
     created_at BIGINT NOT NULL,
     title TEXT NOT NULL,
     company_name TEXT NOT NULL,
     description TEXT NOT NULL,
     location TEXT NOT NULL,
     job_type TEXT NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'contract')),
     created_by_id TEXT NOT NULL
   );

   -- Enable Row Level Security
   ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
   ```

### 5. Run the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
mini-job-board-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── jobs/              # Job listing and detail pages
│   │   ├── companies/         # Company pages
│   │   ├── dashboard/         # User dashboard
│   │   └── about-us/          # About page
│   ├── components/            # Reusable React components
│   │   ├── SearchBar.tsx      # Search functionality
│   │   ├── JobList.tsx        # Job listing component
│   │   ├── Filter.tsx         # Filtering components
│   │   └── ...                # Other UI components
│   ├── lib/                   # Utility libraries
│   │   ├── supabaseClient.ts  # Supabase client configuration
│   │   ├── authContext.tsx    # Authentication context
│   │   └── config.ts          # Application configuration
│   ├── api/                   # API types and interfaces
│   │   └── types.ts           # TypeScript type definitions
│   └── styles/                # Global styles
│       └── globals.css        # Tailwind CSS imports
├── public/                    # Static assets
├── .env.local                 # Environment variables (create this)
└── package.json               # Dependencies and scripts
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🌟 Key Features Explained

### Search & Filter System
The app features a powerful search system that allows users to:
- Search by job title, company name, or keywords
- Filter by job type (Full-time, Part-time, Contract)
- Filter by location
- Real-time search results with pagination

### Responsive Design
Built with Tailwind CSS, the application is fully responsive and provides an optimal experience across all devices.

### Modern Architecture
- **Next.js 15 App Router**: Latest Next.js features for optimal performance
- **TypeScript**: Type-safe development experience
- **Supabase**: Scalable backend with real-time capabilities
- **Component-Based**: Modular, reusable components

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

### Application Configuration

The app uses a centralized configuration system in `src/lib/config.ts`:

- **Pagination**: Items per page settings
- **Search**: Minimum and maximum search length
- **Job Types**: Centralized job type constants
- **Defaults**: Default values for forms and components

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on every push

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build command
- **Railway**: Connect your GitHub repository
- **DigitalOcean App Platform**: Deploy with ease

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the powerful backend platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Feather Icons](https://feathericons.com/) for the beautiful icons

## 👨‍💻 Author

**Della Reno Rinaldi**

- 📧 Email: [renocerberus@gmail.com](mailto:renocerberus@gmail.com)
- 💼 LinkedIn: [Della Reno Rinaldi](https://www.linkedin.com/in/della-reno-rinaldi-1b0790a2/)

## 📞 Support

If you have any questions or need help:

- Create an issue in this repository
- Check the [Next.js documentation](https://nextjs.org/docs)
- Visit [Supabase documentation](https://supabase.com/docs)
- Contact the author via email or LinkedIn

---

**Happy coding! 🎉**

*Built with ❤️ using Next.js and Supabase*
