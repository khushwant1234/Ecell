"use client"
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Eye, EyeOff, Download, Filter, Search, Users, Calendar, Mail, Phone, User, LogOut, Shield } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
// Import your question configurations
import { generalQuestions, teamConfigs } from '../recruitment/form/page'; // Update this path

// Initialize Supabase client - replace with your actual configuration
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const teamColors: { [key: string]: string } = {
  "Tech Team": "bg-pink-100 text-pink-800 border-pink-200",
  "Content & Creation Team": "bg-blue-100 text-blue-800 border-blue-200", 
  "PR & Sponsorship Team": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Videography Team": "bg-red-100 text-red-800 border-red-200",
  "Marketing Team": "bg-green-100 text-green-800 border-green-200",
  "Design Team": "bg-purple-100 text-purple-800 border-purple-200",
  "Event Management Team": "bg-orange-100 text-orange-800 border-orange-200"
};

interface Application {
  id: number;
  name: string;
  email: string;
  teams: string[];
  form_data: any;
  submitted_at: string;
  created_at: string;
  user_email: string;
  user_id: string;
}

interface Stats {
  total: number;
  byTeam: Record<string, number>;
  recent: number;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [expandedCards, setExpandedCards] = useState(new Set<number>());
  const [stats, setStats] = useState<Stats>({
    total: 0,
    byTeam: {},
    recent: 0
  });

  // Use refs to track initialization and prevent multiple calls
  const authInitialized = useRef(false);
  const authListenerSet = useRef(false);
  const mounted = useRef(true);

  // Memoize question mapping
  const questionMapping = useMemo(() => {
    const questionMap: Record<string, string> = {};
    
    generalQuestions.forEach(question => {
      questionMap[question.id] = question.label;
    });
    
    teamConfigs.forEach(team => {
      team.questions.forEach(question => {
        questionMap[question.id] = question.label;
      });
    });
    
    return questionMap;
  }, []);

  const getQuestionLabel = useCallback((questionId: string): string => {
    return questionMapping[questionId] || questionId;
  }, [questionMapping]);

  const getTeamConfigByTitle = useCallback((teamTitle: string) => {
    const teamMapping: Record<string, string> = {
      "Tech Team": "tech-team",
      "Marketing Team": "marketing-team", 
      "Design Team": "design-team",
      "Content & Creation Team": "content-team",
      "PR & Sponsorship Team": "pr-spons-team",
      "Videography Team": "video-team",
      "Event Management Team": "event-team"
    };
    
    const configId = teamMapping[teamTitle];
    return teamConfigs.find(config => config.id === configId);
  }, []);

  // Check admin status
// Improved auth section with better state management

const checkAdminStatus = useCallback(async (email: string | undefined): Promise<boolean> => {
  if (!email) return false;
  
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single();

    if (error && error.message.includes('relation "admin_users" does not exist')) {
      return email.endsWith('@snu.edu.in');
    }

    if (error) {
      console.error('Admin check error:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}, []);

// Memoize admin status when user changes
const adminStatus = useMemo(() => {
  if (!user?.email || !authChecked) return false;
  return isAdmin; // This will be set by the effect below
}, [user?.email, isAdmin, authChecked]);

// Memoize whether we should fetch applications
const shouldFetchApplications = useMemo(() => {
  return authChecked && 
         user && 
         isAdmin && 
         applications.length === 0 && 
         !applicationsLoading;
}, [authChecked, user, isAdmin, applications.length, applicationsLoading]);

// Single initialization effect - simplified and more robust
useEffect(() => {
  let mounted = true;
  let authSubscription: any = null;

  const initializeAuth = async () => {
    // Prevent multiple initializations
    if (authInitialized.current) return;
    authInitialized.current = true;

    try {
      console.log('Initializing auth...');
      
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
      }

      const currentUser = session?.user || null;
      console.log('Current user from session:', currentUser?.email);
      
      if (!mounted) return;

      // Set initial user state
      setUser(currentUser);

      // Check admin status if user exists
      if (currentUser) {
        const isUserAdmin = await checkAdminStatus(currentUser.email);
        if (mounted) {
          setIsAdmin(isUserAdmin);
        }
      }

      // Set auth as checked
      if (mounted) {
        setAuthChecked(true);
        setLoading(false);
      }

      // Set up auth listener - only once
      if (!authListenerSet.current) {
        authListenerSet.current = true;
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (!mounted) return;
            
            console.log('Auth state changed:', event);
            
            const newUser = session?.user || null;
            
            // Handle different auth events
            if (event === 'SIGNED_OUT') {
              setUser(null);
              setIsAdmin(false);
              setApplications([]);
              setAuthChecked(true);
              setLoading(false);
              return;
            }
            
            if (event === 'TOKEN_REFRESHED') {
              // Don't do anything for token refresh - just update user if needed
              if (newUser && (!user || user.id !== newUser.id)) {
                setUser(newUser);
              }
              return;
            }
            
            if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
              setUser(newUser);
              
              if (newUser) {
                const isUserAdmin = await checkAdminStatus(newUser.email);
                if (mounted) {
                  setIsAdmin(isUserAdmin);
                }
              } else {
                setIsAdmin(false);
                setApplications([]);
              }
              
              if (mounted) {
                setAuthChecked(true);
                setLoading(false);
              }
            }
          }
        );
        
        authSubscription = subscription;
      }

    } catch (error) {
      console.error('Auth initialization error:', error);
      if (mounted) {
        setAuthChecked(true);
        setLoading(false);
      }
    }
  };

  // Only initialize if not already done
  initializeAuth();

  // Cleanup function
  return () => {
    mounted = false;
    if (authSubscription) {
      authSubscription.unsubscribe();
    }
  };
}, []); // Empty dependency array - run only once

// Separate effect for fetching applications - triggered by memoized condition
useEffect(() => {
  if (shouldFetchApplications) {
    console.log('Fetching applications for admin user...');
    fetchApplications();
  }
}, [shouldFetchApplications]); // Dependency on memoized value

// Remove the visibility change effect entirely - it's not needed
// The auth state should be stable regardless of tab switching

  const fetchApplications = async () => {
    if (!user || !isAdmin || applicationsLoading) return;
    
    setApplicationsLoading(true);
    try {
      console.log('Fetching applications...');
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        return;
      }

      console.log('Applications fetched:', data?.length || 0);
      if (mounted.current) {
        setApplications(data || []);
        calculateStats(data || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      if (mounted.current) {
        setApplicationsLoading(false);
      }
    }
  };

  const calculateStats = useCallback((data: Application[]) => {
    const teamStats: Record<string, number> = {};
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    data.forEach(app => {
      app.teams.forEach(team => {
        teamStats[team] = (teamStats[team] || 0) + 1;
      });
    });

    const recent = data.filter(app => 
      new Date(app.created_at) > oneDayAgo
    ).length;

    setStats({
      total: data.length,
      byTeam: teamStats,
      recent
    });
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=/admin`
        }
      });
      
      if (error) {
        console.error('Error signing in:', error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
      
      // Reset all state
      setUser(null);
      setIsAdmin(false);
      setApplications([]);
      setAuthChecked(true);
      setLoading(false);
      
      // Reset refs
      authInitialized.current = false;
      authListenerSet.current = false;
    } catch (error) {
      console.error('Sign out error:', error);
      setLoading(false);
    }
  };

  const toggleCardExpansion = useCallback((id: number) => {
    setExpandedCards(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = selectedTeam === 'all' || app.teams.some(team => 
        team.toLowerCase().includes(selectedTeam.toLowerCase())
      );
      return matchesSearch && matchesTeam;
    });
  }, [applications, searchTerm, selectedTeam]);

  const exportToCSV = useCallback(() => {
    const headers = ['ID', 'Name', 'Email', 'Teams', 'Phone', 'Branch', 'Year', 'Roll Number', 'Submitted At'];
    const csvData = filteredApplications.map(app => [
      app.id,
      app.name,
      app.email,
      app.teams.join('; '),
      app.form_data?.phone || '',
      app.form_data?.branch || '',
      app.form_data?.year || '',
      app.form_data?.rollNumber || '',
      new Date(app.submitted_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecell_applications_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [filteredApplications]);

  const renderFormDataByTeam = useCallback((formData: any, appliedTeams: string[]) => {
    if (!formData) return null;

    const excludeKeys = ['name', 'email', 'phone', 'branch', 'year', 'rollNumber'];
    const allQuestionIds = new Set<string>();

    appliedTeams.forEach(teamTitle => {
      const teamConfig = getTeamConfigByTitle(teamTitle);
      if (teamConfig) {
        teamConfig.questions.forEach(q => allQuestionIds.add(q.id));
      }
    });

    const generalAnswers: Array<[string, any]> = [];
    const teamAnswers: Record<string, Array<[string, any]>> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (excludeKeys.includes(key) || !value) return;

      const isGeneralQuestion = generalQuestions.some(q => q.id === key);
      
      if (isGeneralQuestion) {
        generalAnswers.push([key, value]);
      } else if (allQuestionIds.has(key)) {
        for (const teamTitle of appliedTeams) {
          const teamConfig = getTeamConfigByTitle(teamTitle);
          if (teamConfig && teamConfig.questions.some(q => q.id === key)) {
            if (!teamAnswers[teamTitle]) {
              teamAnswers[teamTitle] = [];
            }
            teamAnswers[teamTitle].push([key, value]);
            break;
          }
        }
      } else {
        generalAnswers.push([key, value]);
      }
    });

    return (
      <div className="space-y-8">
        {/* General Questions */}
        {generalAnswers.length > 0 && (
          <div>
            <div className="flex items-center mb-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <h3 className="px-4 text-lg font-semibold text-gray-800 bg-gray-50 rounded-lg py-2">
                General Information
              </h3>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              {generalAnswers.map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <h4 className="font-medium text-gray-700 mb-2">
                    {getQuestionLabel(key)}
                  </h4>
                  <div className="text-gray-600 text-sm">
                    {typeof value === 'object' ? (
                      <pre className="whitespace-pre-wrap text-xs bg-white p-2 rounded border">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    ) : (
                      <p className="whitespace-pre-wrap">{String(value)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team-specific Questions */}
        {appliedTeams.map((teamTitle, index) => {
          const teamQuestions = teamAnswers[teamTitle];
          if (!teamQuestions || teamQuestions.length === 0) return null;

          const teamColor = teamColors[teamTitle] || 'bg-gray-100 text-gray-800 border-gray-200';
          const teamLetter = String.fromCharCode(65 + index);

          return (
            <div key={teamTitle}>
              <div className="flex items-center mb-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <div className="flex items-center gap-3 px-4">
                  <span className="text-sm font-bold text-gray-500">Team {teamLetter}</span>
                  <h3 className={`text-lg font-semibold px-3 py-2 rounded-lg border ${teamColor}`}>
                    {teamTitle}
                  </h3>
                </div>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              <div className={`space-y-4 p-4 rounded-lg border-l-4 ${teamColor.includes('pink') ? 'border-l-pink-300 bg-pink-25' : 
                teamColor.includes('blue') ? 'border-l-blue-300 bg-blue-25' :
                teamColor.includes('yellow') ? 'border-l-yellow-300 bg-yellow-25' :
                teamColor.includes('red') ? 'border-l-red-300 bg-red-25' :
                teamColor.includes('green') ? 'border-l-green-300 bg-green-25' :
                teamColor.includes('purple') ? 'border-l-purple-300 bg-purple-25' :
                teamColor.includes('orange') ? 'border-l-orange-300 bg-orange-25' :
                'border-l-gray-300 bg-gray-25'}`}>
                {teamQuestions.map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <h4 className="font-medium text-gray-700 mb-2">
                      {getQuestionLabel(key)}
                    </h4>
                    <div className="text-gray-600 text-sm">
                      {typeof value === 'object' ? (
                        <pre className="whitespace-pre-wrap text-xs bg-white p-2 rounded border">
                          {JSON.stringify(value, null, 2)}
                        </pre>
                      ) : (
                        <p className="whitespace-pre-wrap bg-white p-3 rounded border">
                          {String(value)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [getQuestionLabel, getTeamConfigByTitle]);

  // Show loading only when we haven't checked auth yet
  if (!authChecked || (loading && !user)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <Shield className="mx-auto h-16 w-16 text-blue-600 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 mb-8">Entrepreneurship Cell - SNU</p>
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Only authorized admins can access this dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  // User authenticated but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this admin dashboard.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Signed in as: {user.email}
            </p>
            <button
              onClick={handleSignOut}
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Entrepreneurship Cell - SNU</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.user_metadata?.name || user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <Users className="h-10 w-10 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <Calendar className="h-10 w-10 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Last 24 Hours</p>
                <p className="text-3xl font-bold text-gray-900">{stats.recent}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <Filter className="h-10 w-10 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Most Popular Team</p>
                <p className="text-lg font-bold text-gray-900">
                  {Object.entries(stats.byTeam).sort(([,a], [,b]) => b - a)[0]?.[0]?.replace(' Team', '') || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
              </div>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Teams</option>
                <option value="tech">Tech Team</option>
                <option value="content">Content & Creation</option>
                <option value="pr">PR & Sponsorship</option>
                <option value="video">Videography</option>
                <option value="marketing">Marketing</option>
                <option value="design">Design</option>
                <option value="event">Event Management</option>
              </select>
            </div>
            <button
              onClick={exportToCSV}
              disabled={filteredApplications.length === 0}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {applicationsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {applications.length === 0 ? 'No applications have been submitted yet.' : 'Try adjusting your search criteria.'}
              </p>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{app.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          ID: {app.id}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{app.email}</span>
                        </div>
                        {app.form_data?.phone && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{app.form_data.phone}</span>
                          </div>
                        )}
                        {app.form_data?.branch && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="h-4 w-4" />
                            <span>{app.form_data.branch} - {app.form_data.year}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(app.submitted_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Teams Applied:</p>
                        <div className="flex flex-wrap gap-2">
                          {app.teams.map((team, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                teamColors[team] || 'bg-gray-100 text-gray-800 border-gray-200'
                              }`}
                            >
                              {team}
                            </span>
                          ))}
                        </div>
                      </div>

                      {expandedCards.has(app.id) && (
                        <div className="mt-6 space-y-6 border-t pt-6">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-6 text-lg">Application Details</h4>
                            {renderFormDataByTeam(app.form_data, app.teams)}
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-700 mb-2">Raw Form Data (JSON)</h4>
                            <pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap max-h-64 overflow-y-auto bg-white p-3 rounded border">
                              {JSON.stringify(app.form_data, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleCardExpansion(app.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title={expandedCards.has(app.id) ? "Hide details" : "Show details"}
                    >
                      {expandedCards.has(app.id) ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results count */}
        {applications.length > 0 && (
          <div className="mt-8 text-center text-gray-500">
            Showing {filteredApplications.length} of {applications.length} applications
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;