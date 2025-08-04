import Navbar from 'components/Navbar';
import type { Route } from './+types/home';
import ResumeCard from 'components/ResumeCard';
import { resumes } from '~/constants';
import { useEffect } from 'react';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'getIn10minCv' },
    { name: 'description', content: 'Beat the Bots. Land the Interview.' },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if user is NOT authenticated
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth?.isAuthenticated]);

  return (
    <main
      className="bg-[url('/images/bg-main.svg')] bg-cover 
      "
      // min-h-screen flex items-center justify-center
    >
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Is Your Resume ATS-Friendly? Get Score & Rating </h1>
          <h2> Review Your Submission & Get AI-Powered Feedback</h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
