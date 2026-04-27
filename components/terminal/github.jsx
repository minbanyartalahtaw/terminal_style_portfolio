"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  ExternalLink,
  GitBranch,
  Github,
  Star,
  Users,
} from "lucide-react";

const GITHUB_USERNAME = "minbanyartalahtaw";

const formatNumber = (value) => {
  if (typeof value !== "number") return "0";
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
};

const formatDate = (dateString) => {
  if (!dateString) return "unknown";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const StatCard = ({ icon, label, value }) => (
  <div className="p-2.5 rounded-none bg-[#3A3A3A] border-2 border-[#1A1A1A] shadow-[1px_1px_0px_#000000]">
    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-0.5">
      <span className="text-[#D0D0D0]">{icon}</span>
      <span>{label}</span>
    </div>
    <div className="text-xs font-semibold text-slate-100">{value}</div>
  </div>
);

const RepoCard = ({ repo }) => (
  <motion.a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.25 }}
    className="block p-2.5 rounded-none bg-[#3A3A3A] border-2 border-[#1A1A1A] shadow-[1px_1px_0px_#000000] hover:bg-[#474747] transition-colors">
    <div className="flex items-start justify-between gap-2">
      <h4 className="text-xs font-semibold text-[#D0D0D0] leading-tight">
        {repo.name}
      </h4>
      <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
    </div>

    <p className="text-[11px] text-slate-300 mt-1.5 line-clamp-2">
      {repo.description || "No description yet."}
    </p>

    <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-slate-400">
      {repo.language ? <span>{repo.language}</span> : null}
      <span className="inline-flex items-center gap-1">
        <Star className="w-3 h-3" />
        {formatNumber(repo.stargazers_count)}
      </span>
      <span className="inline-flex items-center gap-1">
        <GitBranch className="w-3 h-3" />
        {formatNumber(repo.forks_count)}
      </span>
      <span>Updated {formatDate(repo.updated_at)}</span>
    </div>
  </motion.a>
);

const GitHubActivity = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError("");

        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`,
          ),
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error("GitHub API request failed");
        }

        const [profileData, reposData] = await Promise.all([
          profileRes.json(),
          reposRes.json(),
        ]);

        if (!cancelled) {
          setProfile(profileData);
          setRepos(Array.isArray(reposData) ? reposData : []);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load GitHub data right now. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchGitHubData();

    return () => {
      cancelled = true;
    };
  }, []);

  const topLanguages = useMemo(() => {
    const langMap = new Map();

    repos.forEach((repo) => {
      if (!repo.language) return;
      const currentCount = langMap.get(repo.language) || 0;
      langMap.set(repo.language, currentCount + 1);
    });

    return Array.from(langMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([language, count]) => ({ language, count }));
  }, [repos]);

  if (loading) {
    return (
      <div className="p-4 rounded-none bg-[#2C2C2C] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#000000] text-slate-200">
        Loading GitHub profile for {GITHUB_USERNAME}...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-4 rounded-none bg-[#2C2C2C] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#000000] text-slate-200">
        <p>{error || "Unable to load profile."}</p>
        <a
          className="inline-flex items-center gap-2 mt-3 text-[#8ae234] hover:underline"
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer">
          Open GitHub Profile <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-5 gap-3 p-1"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}>
      <div className="lg:col-span-2 space-y-3">
        <div className="p-3 rounded-none bg-[#2C2C2C] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#000000]">
          <div className="flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-none bg-[#3A3A3A] border-2 border-[#1A1A1A] shadow-[1px_1px_0px_#000000] flex items-center justify-center">
              <Github className="w-5 h-5 text-[#D0D0D0]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100 leading-tight">
                {profile.name || GITHUB_USERNAME}
              </h3>
              <p className="text-[11px] text-slate-400">@{profile.login}</p>
            </div>
          </div>

          {profile.bio ? (
            <p className="text-xs text-slate-300 mt-2 line-clamp-3">{profile.bio}</p>
          ) : null}

          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2.5 text-[#8ae234] hover:underline text-xs">
            Visit GitHub Profile
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <StatCard
            icon={<BookOpen className="w-3.5 h-3.5" />}
            label="Public Repos"
            value={formatNumber(profile.public_repos)}
          />
          <StatCard
            icon={<Users className="w-3.5 h-3.5" />}
            label="Followers"
            value={formatNumber(profile.followers)}
          />
        </div>

        <div className="p-3 rounded-none bg-[#2C2C2C] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#000000]">
          <h4 className="text-xs font-semibold text-slate-100 mb-1.5">
            Top Languages (recent repos)
          </h4>
          {topLanguages.length === 0 ? (
            <p className="text-[11px] text-slate-400">No language data found.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {topLanguages.map((item) => (
                <span
                  key={item.language}
                  className="px-1.5 py-0.5 text-[11px] rounded-none bg-[#3A3A3A] border border-[#1A1A1A] shadow-[1px_1px_0px_#000000] text-[#D0D0D0]">
                  {item.language} x {item.count}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-3 p-3 rounded-none bg-[#2C2C2C] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#000000]">
        <h3 className="text-sm font-semibold text-slate-100 mb-2.5">
          Recent Repositories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {repos.length === 0 ? (
            <p className="text-xs text-slate-400">No repositories found.</p>
          ) : (
            repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubActivity;
