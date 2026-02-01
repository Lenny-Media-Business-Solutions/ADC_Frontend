import React, { useState, useEffect } from 'react';
import {
  Users,
  MessageSquare,
  LayoutDashboard,
  FileText,
  Settings,
  Bell,
  Search,
  CheckCircle,
  XCircle,
  TrendingUp,
  MapPin,
  Calendar,
  LogOut,
  Mail,
  UserCheck,
  Plus,
  Edit,
  Trash2,
  LayoutList,
  Newspaper,
  Save,
  X,
  Menu,
  ChevronLeft,
  Filter,
  Eye,
  MessageSquareQuote
} from 'lucide-react';
import { PROGRAMS, PROJECTS } from '../constants';
import api from '../api';

const TREND_DATA = [
  { month: 'Oct', total: 19 },
  { month: 'Nov', total: 26 },
  { month: 'Dec', total: 23 },
  { month: 'Jan', total: 32 },
  { month: 'Feb', total: 35 },
  { month: 'Mar', total: 40 },
];

const SystemActivityChart = ({ data }: { data: any[] }) => {
  const chartData = data.length > 0 ? data : [
    { month: 'Oct', total: 0 },
    { month: 'Nov', total: 0 },
    { month: 'Dec', total: 0 },
    { month: 'Jan', total: 0 },
    { month: 'Feb', total: 0 },
    { month: 'Mar', total: 0 },
  ];

  const maxVal = Math.max(...chartData.map(d => d.total), 10) + 5;

  return (
    <div className="bg-white p-3 xs:p-4 sm:p-6 lg:p-8 rounded-xl xs:rounded-2xl sm:rounded-[2.5rem] border border-earth-100 shadow-sm h-full flex flex-col">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 xs:mb-6 lg:mb-8 gap-3 xs:gap-4">
        <h3 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-earth-900 leading-tight">Monthly System Activity</h3>
        <div className="flex gap-2 xs:gap-3 lg:gap-4 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex-wrap">
          <div className="flex items-center gap-1 xs:gap-1.5">
            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-emerald-500"></div>
            <span className="leading-tight">Total submissions (Volunteers + Messages + Partnerships)</span>
          </div>
        </div>
      </div>
      <div className="relative h-40 xs:h-48 sm:h-56 md:h-60 lg:h-64 xl:h-72 w-full flex items-end justify-between gap-1 xs:gap-2 sm:gap-3 lg:gap-4 pt-4 flex-grow">
        {chartData.map((data, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group min-w-0">
            <div className="w-full flex justify-center items-end h-full">
              <div
                className="w-3 xs:w-4 sm:w-6 lg:w-8 xl:w-10 bg-emerald-500/80 rounded-t-lg transition-all duration-700 hover:bg-emerald-600 hover:scale-x-110 relative min-h-[4px]"
                style={{ height: `${(data.total / maxVal) * 100}%` }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-earth-900 font-black text-[10px] xs:text-xs">
                  {data.total}
                </div>
              </div>
            </div>
            <p className="mt-2 xs:mt-3 sm:mt-4 text-[8px] xs:text-[9px] sm:text-[10px] font-black text-earth-400 uppercase tracking-widest truncate">{data.month}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export function AdminDashboard() {  // Changed from export default function
  const [activeTab, setActiveTab] = useState<'overview' | 'volunteers' | 'programs' | 'projects' | 'impact-stories' | 'news' | 'contact' | 'partnerships'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [programsList, setProgramsList] = useState(PROGRAMS);
  const [projectsList, setProjectsList] = useState(PROJECTS);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [impactStoriesList, setImpactStoriesList] = useState<any[]>([]);

  const [summary, setSummary] = useState<any>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loadingVolunteers, setLoadingVolunteers] = useState(true);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string, id: string | string[], title?: string } | null>(null);

  useEffect(() => {
    fetchSummary();
    fetchVolunteers();
    fetchPrograms();
    fetchProjects();
    fetchNews();
    fetchImpactStories();
    fetchContactMessages();
    fetchPartnerships();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await api.get('programs/');
      setProgramsList(response.data.results || response.data);
    } catch (err) {
      console.error('Failed to fetch programs', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get('projects/');
      setProjectsList(response.data.results || response.data);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await api.get('news/?include_drafts=true');
      setNewsList(response.data.results || response.data);
    } catch (err) {
      console.error('Failed to fetch news', err);
    }
  };

  const fetchImpactStories = async () => {
    try {
      const response = await api.get('impact-stories/');
      setImpactStoriesList(response.data.results || response.data);
    } catch (err) {
      console.error('Failed to fetch impact stories', err);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const response = await api.get('contact/');
      setContactMessages(response.data.results || response.data);
    } catch (err) {
      console.error('Failed to fetch contact messages', err);
    }
  };

  const fetchPartnerships = async () => {
    try {
      const response = await api.get('partnerships/');
      setPartnerships(response.data.results || response.data);
    } catch (err) {
      console.error('Failed to fetch partnerships', err);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await api.get('dashboard/summary/');
      setSummary(response.data);
    } catch (err) {
      console.error('Failed to fetch summary', err);
    } finally {
      setLoadingSummary(false);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const response = await api.get('volunteers/');
      setVolunteers(response.data.results || response.data);
    } catch (err) {
      console.error('Failed to fetch volunteers', err);
    } finally {
      setLoadingVolunteers(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.hash = '#/';
    window.location.reload();
  };

  const [editingItem, setEditingItem] = useState<{ type: string, data: any } | null>(null);

  const handleDelete = (type: any, id: string, title?: string) => {
    setDeleteConfirm({ type, id, title });
  };

  const handleBulkDelete = () => {
    if (!selectedIds.length) return;
    setDeleteConfirm({ type: activeTab, id: [...selectedIds], title: `${selectedIds.length} selected items` });
  };

  const performDelete = async () => {
    if (!deleteConfirm) return;
    const { type, id } = deleteConfirm;

    try {
      if (Array.isArray(id)) {
        await api.delete(`${type}/bulk_delete/`, { data: { ids: id } });
        if (type === 'contact') setContactMessages(prev => prev.filter(c => !id.includes(c.id)));
        else if (type === 'partnerships') setPartnerships(prev => prev.filter(p => !id.includes(p.id)));
        else if (type === 'volunteers') setVolunteers(prev => prev.filter(v => !id.includes(v.id)));
        else if (type === 'programs') setProgramsList(prev => prev.filter(p => !id.includes(p.id)));
        else if (type === 'projects') setProjectsList(prev => prev.filter(p => !id.includes(p.id)));
        else if (type === 'news') setNewsList(prev => prev.filter(n => !id.includes(n.id)));
        else if (type === 'impact-stories') setImpactStoriesList(prev => prev.filter(s => !id.includes(s.id)));
        setSelectedIds([]);
      } else {
        if (type === 'volunteers') {
          await api.delete(`volunteers/${id}/`);
          setVolunteers(prev => prev.filter(v => v.id !== id));
        } else if (type === 'contact') {
          await api.delete(`contact/${id}/`);
          setContactMessages(prev => prev.filter(c => c.id !== id));
        } else if (type === 'partnerships') {
          await api.delete(`partnerships/${id}/`);
          setPartnerships(prev => prev.filter(p => p.id !== id));
        } else {
          await api.delete(`${type}/${id}/`);
          if (type === 'programs') setProgramsList(prev => prev.filter(p => !id.includes(p.id)));
          if (type === 'projects') setProjectsList(prev => prev.filter(p => !id.includes(p.id)));
          if (type === 'news') setNewsList(prev => prev.filter(n => !id.includes(n.id)));
          if (type === 'impact-stories') setImpactStoriesList(prev => prev.filter(s => !id.includes(s.id)));
        }
      }
      fetchSummary();
      setDeleteConfirm(null);
    } catch (err) {
      console.error(`Failed to delete`, err);
      alert(`Failed to delete items.`);
    }
  };

  const handleUpdateNewsStatus = async (news: any, is_published: boolean) => {
    try {
      const response = await api.post(`news/${news.id || news.slug}/update_status/?include_drafts=true`, { is_published });
      if (response.data.status === 'success') {
        const updatedStatus = response.data.is_published;
        setNewsList(prev => prev.map(n => (n.id === news.id) ? { ...n, is_published: updatedStatus } : n));
        fetchSummary();
      }
    } catch (err: any) {
      console.error('Failed to update news status', err);
      const errorMsg = err.response?.data?.error || err.response?.data?.detail || 'Please check your connection and try again.';
      alert(`Failed to update status.\n\nError: ${errorMsg}`);
    }
  };

  const handleViewItem = async (type: string, item: any) => {
    setEditingItem({ type, data: item });
    if (['contact', 'partnerships'].includes(type) && !item.is_read) {
      try {
        const endpoint = type;
        const response = await api.get(`${endpoint}/${item.id}/`);
        const updatedItem = response.data;

        // Update local list
        if (type === 'contact') {
          setContactMessages(prev => prev.map(m => m.id === item.id ? updatedItem : m));
        } else if (type === 'partnerships') {
          setPartnerships(prev => prev.map(p => p.id === item.id ? updatedItem : p));
        }

        // Refresh summary for unread count
        fetchSummary();
      } catch (err) {
        console.error(`Failed to mark ${type} as read`, err);
      }
    }
  };

  const getFilteredData = (list: any[]) => {
    if (!searchQuery) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(item =>
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.full_name && item.full_name.toLowerCase().includes(q)) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      (item.summary && item.summary.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.organization_name && item.organization_name.toLowerCase().includes(q)) ||
      (item.subject && item.subject.toLowerCase().includes(q))
    );
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSidebarOpen(false);
        setSelectedIds([]);
        setSearchQuery('');
      }}
      className={`w-full flex items-center gap-2 xs:gap-3 lg:gap-4 px-3 xs:px-4 lg:px-6 py-2.5 xs:py-3 lg:py-4 rounded-lg xs:rounded-xl lg:rounded-2xl transition-all group ${activeTab === id
        ? 'bg-savanna-500 text-white shadow-lg xs:shadow-xl shadow-savanna-500/20'
        : 'text-earth-400 hover:bg-earth-800 hover:text-white'
        } ${sidebarCollapsed ? 'justify-center' : ''}`}
      title={sidebarCollapsed ? label : ''}
    >
      <Icon size={16} className="xs:w-[18px] xs:h-[18px] lg:w-5 lg:h-5 flex-shrink-0" />
      {!sidebarCollapsed && <span className="font-bold text-[10px] xs:text-xs lg:text-sm tracking-wide truncate">{label}</span>}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F0F5F2] flex flex-col font-sans">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 xs:top-6 left-3 xs:left-4 z-50 w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 bg-earth-900 text-white rounded-lg xs:rounded-xl shadow-lg flex items-center justify-center transition-transform active:scale-95"
      >
        <Menu size={20} className="xs:w-[22px] xs:h-[22px] sm:w-6 sm:h-6" />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-earth-900/80 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex flex-col lg:flex-row w-full max-w-[2000px] mx-auto flex-grow relative">
        {/* Sidebar */}
        <aside className={`
          lg:relative fixed
          ${sidebarCollapsed ? 'w-16 xs:w-20 lg:w-24' : 'w-64 xs:w-72 sm:w-80 lg:w-96'}
          bg-earth-900
          m-3 xs:m-4 sm:m-6
          rounded-xl xs:rounded-2xl lg:rounded-[2.5rem]
          shadow-2xl
          flex flex-col
          p-3 xs:p-4 sm:p-6 lg:p-8
          ${sidebarOpen ? 'h-[calc(100vh-2rem)] fixed translate-x-0' : 'h-auto lg:h-[calc(100vh-3rem)] -translate-x-[calc(100%+1.5rem)] lg:translate-x-0'}
          z-50
          transition-all duration-300 ease-in-out
        `}>
          {/* Header */}
          <div className={`mb-6 xs:mb-8 lg:mb-12 ${sidebarCollapsed ? 'px-0' : 'px-2'}`}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-earth-800 text-earth-400 hover:text-white mb-4 ml-auto transition-all"
            >
              <ChevronLeft size={18} className={`transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
            {!sidebarCollapsed && (
              <>
                <div className="flex items-center gap-2 xs:gap-3 mb-2">
                  <div className="w-6 h-6 xs:w-7 xs:h-7 lg:w-8 lg:h-8 rounded-md xs:rounded-lg bg-savanna-500 flex items-center justify-center font-black text-white text-[10px] xs:text-xs flex-shrink-0">ADC</div>
                  <span className="text-white font-black text-[10px] xs:text-xs lg:text-sm uppercase tracking-widest truncate">Admin Portal</span>
                </div>
                <p className="text-earth-400 text-[8px] xs:text-[9px] lg:text-[10px] uppercase font-black tracking-[0.2em] truncate">Management Environment</p>
              </>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5 xs:space-y-2 flex-grow overflow-y-auto custom-scrollbar pr-1 xs:pr-2">
            <SidebarItem id="overview" icon={LayoutDashboard} label="Overview" />
            <SidebarItem id="volunteers" icon={UserCheck} label="Volunteers" />
            <SidebarItem id="programs" icon={LayoutList} label="Programs" />
            <SidebarItem id="projects" icon={FileText} label="Projects" />
            <SidebarItem id="impact-stories" icon={MessageSquareQuote} label="Impact Stories" />
            <SidebarItem id="news" icon={Newspaper} label="News / Dispatches" />
            <SidebarItem id="contact" icon={Mail} label="Contact Messages" />
            <SidebarItem id="partnerships" icon={MessageSquare} label="Partnerships" />
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`mt-4 xs:mt-6 lg:mt-8 flex items-center gap-2 xs:gap-3 lg:gap-4 px-3 xs:px-4 lg:px-6 py-2.5 xs:py-3 lg:py-4 text-earth-400 hover:text-white transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}
            title={sidebarCollapsed ? 'Logout & Exit' : ''}
          >
            <LogOut size={16} className="xs:w-[18px] xs:h-[18px] lg:w-5 lg:h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="font-bold text-[10px] xs:text-xs lg:text-sm truncate">Logout & Exit</span>}
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow transition-all duration-300 p-4 xs:p-6 lg:p-10 xl:p-12 w-full min-w-0 px-14 xs:px-16 sm:px-6 lg:px-10 xl:px-12">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 xs:mb-8 lg:mb-12 gap-3 xs:gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif font-black text-earth-900 capitalize tracking-tight leading-tight">
                {activeTab} <span className="text-savanna-500">Center</span>
              </h2>
              <p className="text-earth-400 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm font-medium mt-1">Manage organizational data.</p>
            </div>
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-end">
              <div className="relative flex-grow sm:flex-grow-0 max-w-[140px] xs:max-w-[180px] sm:max-w-none">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-earth-100 rounded-full pl-7 xs:pl-8 sm:pl-10 lg:pl-12 pr-2 xs:pr-3 sm:pr-6 py-1 xs:py-1.5 sm:py-2.5 text-[9px] xs:text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-savanna-500 w-full sm:w-48 md:w-56 lg:w-64 xl:w-72 transition-all"
                  placeholder="Search..."
                />
                <Search className="absolute left-2 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 text-earth-300" size={12} />
              </div>
              <button className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-earth-100 flex items-center justify-center text-earth-900 relative flex-shrink-0 hover:border-earth-200 transition-all active:scale-95">
                <Bell size={12} className="xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-savanna-500 rounded-full border border-white"></span>
              </button>
              <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-earth-900 border border-white shadow-md overflow-hidden flex items-center justify-center text-white font-black text-[8px] xs:text-[9px] sm:text-xs flex-shrink-0">
                AD
              </div>
            </div>
          </header>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4 xs:space-y-5 sm:space-y-6 lg:space-y-8 xl:space-y-10 animate-fade-up">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
                {[
                  { label: 'Active Volunteers', val: summary?.volunteers_count || '...', change: '', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', tab: 'volunteers' },
                  { label: 'Ongoing Projects', val: summary?.projects_count || '...', change: `Across ${summary?.programs_count || 0} Programs`, icon: FileText, color: 'text-earth-600', bg: 'bg-earth-50', tab: 'projects' },
                  { label: 'Impact Stories', val: summary?.impact_stories_count || '...', change: 'Success narratives', icon: MessageSquareQuote, color: 'text-savanna-600', bg: 'bg-savanna-50', tab: 'impact-stories' },
                  { label: 'Partnerships', val: summary?.partnerships_count || '...', change: `${summary?.unread_partnerships_count || 0} unread`, icon: MessageSquare, color: 'text-savanna-600', bg: 'bg-savanna-50', tab: 'partnerships' },
                  { label: 'Contact Messages', val: summary?.messages_count || '...', change: `${summary?.unread_messages_count || 0} unread`, icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50', tab: 'contact' },
                ].map((stat: any, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveTab(stat.tab);
                      setSearchQuery('');
                      setSelectedIds([]);
                    }}
                    className="bg-white p-4 xs:p-5 sm:p-6 lg:p-8 rounded-xl xs:rounded-2xl sm:rounded-[2rem] border border-earth-100 shadow-sm hover:shadow-xl hover:border-savanna-200 transition-all text-left active:scale-95 group"
                  >
                    <div className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${stat.bg} ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 xs:mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform`}>
                      <stat.icon size={18} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                    </div>
                    <p className="text-earth-400 text-[8px] xs:text-[9px] sm:text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
                    <h4 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-earth-900 mb-1.5 xs:mb-2">{stat.val}</h4>
                    <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold text-earth-500 uppercase tracking-tighter">{stat.change}</p>
                  </button>
                ))}
              </div>

              {/* Charts and Summary */}
              <div className="w-full">
                <SystemActivityChart data={summary?.monthly_activity || []} />
              </div>
            </div>
          )}

          {/* CRUD Tables */}
          {['programs', 'projects', 'news', 'impact-stories'].includes(activeTab) && (
            <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-[3rem] border border-earth-100 shadow-xl p-3 xs:p-4 sm:p-6 lg:p-10 animate-fade-up overflow-hidden">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 xs:mb-6 sm:mb-8 lg:mb-10 gap-3 xs:gap-4">
                <h3 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-earth-900 uppercase tracking-tight">Manage {activeTab}</h3>
                <button
                  onClick={() => setEditingItem({ type: activeTab, data: {} })}
                  className="bg-earth-900 text-white px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-savanna-500 transition-all flex items-center gap-1.5 xs:gap-2 w-full xs:w-auto justify-center active:scale-95"
                >
                  <Plus size={14} className="xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px]" /> Add New
                </button>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {getFilteredData(activeTab === 'programs' ? programsList : activeTab === 'projects' ? projectsList : activeTab === 'news' ? newsList : impactStoriesList).map((item: any) => (
                  <div key={item.id} className="bg-earth-50/50 rounded-2xl p-4 border border-earth-100 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <h4 className="font-black text-earth-900 text-sm leading-tight mb-1">{item.title}</h4>
                        <p className="text-[10px] text-earth-500 line-clamp-2 italic">{item.description || item.summary}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {activeTab === 'news' ? (
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {item.is_published ? 'Active' : 'Inactive'}
                          </span>
                        ) : (
                          <span className="text-[8px] font-black uppercase tracking-widest text-earth-500 bg-white px-2 py-1 rounded-full border border-earth-100">
                            {item.status || item.date || 'Active'}
                          </span>
                        )}
                      </div>
                    </div>

                    {activeTab !== 'news' && (item.location || item.category || item.beneficiaries) && (
                      <div className="flex items-center gap-2 text-[10px] text-earth-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-savanna-500"></span>
                        {item.location || item.category || item.beneficiaries}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-earth-100/50">
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => setEditingItem({ type: activeTab, data: item })}
                          className="flex-grow flex items-center justify-center gap-2 py-2 bg-white text-earth-900 border border-earth-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                        >
                          <Edit size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(activeTab as any, item.id, item.title)}
                          className="flex-grow flex items-center justify-center gap-2 py-2 bg-white text-red-600 border border-red-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {getFilteredData(activeTab === 'programs' ? programsList : activeTab === 'projects' ? projectsList : activeTab === 'news' ? newsList : impactStoriesList).length === 0 && (
                  <div className="text-center py-8 text-earth-400 text-xs font-medium italic">
                    No items found matching your search.
                  </div>
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="w-full text-left min-w-[500px] xs:min-w-[600px] sm:min-w-[800px]">
                    <thead className="bg-earth-50/50 text-earth-400 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                      <tr>
                        <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4">{activeTab === 'news' ? 'Title / Summary' : 'Title / Info'}</th>
                        {activeTab !== 'news' && (
                          <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 hidden lg:table-cell">{activeTab === 'projects' ? 'Location' : 'Impact'}</th>
                        )}
                        <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 hidden md:table-cell">{activeTab === 'news' ? 'Status' : 'Status / Date'}</th>
                        <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-earth-50">
                      {getFilteredData(activeTab === 'programs' ? programsList : activeTab === 'projects' ? projectsList : activeTab === 'news' ? newsList : impactStoriesList).map((item: any) => (
                        <tr key={item.id} className="hover:bg-earth-50/20 transition-colors group">
                          <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6">
                            <p className="font-black text-earth-900 text-[11px] xs:text-xs sm:text-sm lg:text-base group-hover:text-savanna-500 transition-colors leading-tight">{item.title}</p>
                            <p className="text-[9px] xs:text-[10px] sm:text-xs text-earth-400 line-clamp-2 italic max-w-md mt-1">
                              {item.description || item.summary}
                            </p>
                            <div className="sm:hidden mt-2 space-y-1">
                              <p className="text-[8px] xs:text-[9px] text-earth-500 font-bold">{item.location || item.category || item.beneficiaries}</p>
                              <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-widest text-earth-500 bg-earth-50 px-2 py-0.5 rounded-full inline-block">
                                {item.status || item.date || 'Active'}
                              </span>
                            </div>
                          </td>
                          {activeTab !== 'news' && (
                            <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 text-[11px] xs:text-xs sm:text-sm text-earth-600 font-medium hidden lg:table-cell">
                              {item.location || item.category || item.beneficiaries}
                            </td>
                          )}
                          <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 hidden md:table-cell">
                            {activeTab === 'news' ? (
                              <select
                                value={item.is_published ? 'active' : 'inactive'}
                                onChange={(e) => handleUpdateNewsStatus(item, e.target.value === 'active')}
                                className={`text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 xs:px-2.5 sm:px-3 py-1 rounded-full cursor-pointer transition-all border-none focus:ring-2 focus:ring-savanna-500 ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            ) : (
                              <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-500 bg-earth-50 px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 rounded-full inline-block">
                                {item.status || item.date || 'Active'}
                              </span>
                            )}
                          </td>
                          <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 text-right">
                            <div className="flex justify-end gap-1 xs:gap-1.5 sm:gap-2">
                              <button
                                onClick={() => setEditingItem({ type: activeTab, data: item })}
                                className="p-1.5 xs:p-2 sm:p-2.5 bg-earth-50 text-earth-400 hover:text-earth-900 hover:bg-white border border-transparent hover:border-earth-100 rounded-md xs:rounded-lg sm:rounded-xl transition-all active:scale-95"
                              >
                                <Edit size={12} className="xs:w-[14px] xs:h-[14px] sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(activeTab as any, item.id, item.title)}
                                className="p-1.5 xs:p-2 sm:p-2.5 bg-earth-50 text-earth-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-md xs:rounded-lg sm:rounded-xl transition-all active:scale-95"
                              >
                                <Trash2 size={12} className="xs:w-[14px] xs:h-[14px] sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Volunteers Tab */}
          {activeTab === 'volunteers' && (
            <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-[3rem] border border-earth-100 shadow-xl p-3 xs:p-4 sm:p-6 lg:p-10 animate-fade-up">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 xs:mb-6 sm:mb-8 lg:mb-10 gap-3 xs:gap-4">
                <h3 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-earth-900">Volunteer Management</h3>
                <button
                  onClick={fetchVolunteers}
                  className="bg-earth-50 text-earth-900 px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-earth-100 transition-all w-full xs:w-auto active:scale-95"
                >
                  Refresh
                </button>
              </div>
              <div className="space-y-2.5 xs:space-y-3 sm:space-y-4">
                {getFilteredData(volunteers).length === 0 ? (
                  <div className="text-center py-10 xs:py-12 sm:py-16 lg:py-20 bg-earth-50 rounded-xl sm:rounded-[2rem] border border-dashed border-earth-200">
                    <Users className="mx-auto mb-3 xs:mb-4 text-earth-300" size={32} />
                    <p className="text-earth-400 font-medium text-xs xs:text-sm sm:text-base">No volunteer applications found.</p>
                  </div>
                ) : getFilteredData(volunteers).map(v => (
                  <div key={v.id} className="flex flex-col xs:flex-row items-start xs:items-center justify-between p-3 xs:p-4 sm:p-5 lg:p-6 bg-earth-50 rounded-lg xs:rounded-xl sm:rounded-[2rem] border border-earth-100 hover:border-savanna-200 hover:bg-white transition-all group gap-3 xs:gap-4">
                    <div className="flex items-center gap-3 xs:gap-4 sm:gap-5 lg:gap-6 w-full xs:w-auto min-w-0">
                      <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg xs:rounded-xl sm:rounded-2xl bg-white shadow-sm flex items-center justify-center text-earth-900 flex-shrink-0 group-hover:shadow-md transition-shadow">
                        <Users size={18} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-black text-earth-900 text-xs xs:text-sm sm:text-base lg:text-lg truncate">{v.full_name}</h4>
                        <p className="text-[9px] xs:text-[10px] sm:text-xs text-earth-400 font-bold uppercase tracking-widest truncate">{v.area_of_interest}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between xs:justify-end gap-3 xs:gap-6 sm:gap-8 lg:gap-10 w-full xs:w-auto">
                      <div className="text-left xs:text-right">
                        <p className="text-[8px] xs:text-[9px] sm:text-xs text-earth-400 font-bold uppercase tracking-widest mb-0.5 xs:mb-1">Applied On</p>
                        <p className="text-[10px] xs:text-xs sm:text-sm font-bold text-earth-700">{new Date(v.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-1.5 xs:gap-2 flex-shrink-0">
                        <button
                          onClick={() => setEditingItem({ type: 'volunteers', data: v })}
                          className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white text-earth-400 hover:text-savanna-600 border border-earth-100 flex items-center justify-center transition-all active:scale-95"
                          title="View Details"
                        >
                          <Eye size={14} className="xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px]" />
                        </button>
                        <button
                          onClick={() => handleDelete('volunteers', v.id, v.full_name)}
                          className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white text-earth-400 hover:text-red-600 border border-earth-100 flex items-center justify-center transition-all active:scale-95"
                          title="Delete"
                        >
                          <Trash2 size={14} className="xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Messages Tab */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-[3rem] border border-earth-100 shadow-xl p-3 xs:p-4 sm:p-6 lg:p-10 animate-fade-up">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 xs:mb-6 sm:mb-8 lg:mb-10 gap-3 xs:gap-4">
                <h3 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-earth-900 leading-tight">Contact Messages</h3>
                <div className="flex gap-2 w-full xs:w-auto">
                  {selectedIds.length > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="bg-red-500 text-white px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <Trash2 size={14} /> Delete ({selectedIds.length})
                    </button>
                  )}
                  <button
                    onClick={fetchContactMessages}
                    className="bg-earth-50 text-earth-900 px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-earth-100 transition-all flex-grow xs:flex-grow-0 active:scale-95"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {contactMessages.length > 0 ? (
                <>
                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {getFilteredData(contactMessages).map((msg: any) => (
                      <div key={msg.id} className={`bg-earth-50/50 rounded-2xl p-4 border border-earth-100 space-y-4 relative ${!msg.is_read ? 'border-l-4 border-savanna-500' : ''}`}>
                        <div className="flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-black text-earth-900 text-sm leading-tight truncate">{msg.full_name}</h4>
                              {!msg.is_read && <span className="w-2 h-2 rounded-full bg-savanna-500 animate-pulse"></span>}
                            </div>
                            <p className="text-[10px] text-earth-400 truncate">{msg.email}</p>
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-widest text-earth-500 bg-white px-2 py-1 rounded-full border border-earth-100">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="bg-white/50 rounded-xl p-3 border border-earth-100/50">
                          <p className="text-[9px] font-black uppercase tracking-widest text-earth-400 mb-1">Subject</p>
                          <p className="text-[11px] font-bold text-earth-700 leading-tight">{msg.subject}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex gap-2 w-full">
                            <button
                              onClick={() => handleViewItem('contact', msg)}
                              className="flex-grow flex items-center justify-center gap-2 py-2 bg-earth-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                            >
                              <Eye size={12} /> View Message
                            </button>
                            <button
                              onClick={() => handleDelete('contact', msg.id, msg.full_name || msg.email)}
                              className="w-12 h-10 flex items-center justify-center bg-white text-red-600 border border-red-50 rounded-xl transition-all active:scale-95"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                      <table className="w-full text-left min-w-[600px] sm:min-w-[800px]">
                        <thead className="bg-earth-50/50 text-earth-400 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                          <tr>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 w-10">
                              <input
                                type="checkbox"
                                checked={selectedIds.length === contactMessages.length && contactMessages.length > 0}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedIds(contactMessages.map(m => m.id));
                                  } else {
                                    setSelectedIds([]);
                                  }
                                }}
                                className="rounded border-earth-300 text-savanna-500 focus:ring-savanna-500"
                              />
                            </th>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 font-black">Name / Email</th>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 hidden md:table-cell font-black">Subject</th>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 hidden sm:table-cell font-black">Status</th>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 hidden sm:table-cell font-black">Date</th>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 text-right font-black">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-earth-50">
                          {getFilteredData(contactMessages).map((msg: any) => (
                            <tr key={msg.id} className={`hover:bg-earth-50/20 transition-colors group ${selectedIds.includes(msg.id) ? 'bg-savanna-50/30' : ''} ${!msg.is_read ? 'border-l-4 border-savanna-500 bg-savanna-50/10' : ''}`}>
                              <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(msg.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedIds(prev => [...prev, msg.id]);
                                    } else {
                                      setSelectedIds(prev => prev.filter(id => id !== msg.id));
                                    }
                                  }}
                                  className="rounded border-earth-300 text-savanna-500 focus:ring-savanna-500"
                                />
                              </td>
                              <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6">
                                <p className={`${msg.is_read ? 'font-medium text-earth-600' : 'font-black text-earth-900'} text-[11px] xs:text-xs sm:text-sm lg:text-base group-hover:text-savanna-500 transition-colors leading-tight`}>{msg.full_name}</p>
                                <p className="text-[9px] xs:text-[10px] sm:text-xs text-earth-400 break-all mt-1">{msg.email}</p>
                              </td>
                              <td className={`px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 text-[11px] xs:text-xs sm:text-sm hidden md:table-cell ${msg.is_read ? 'font-medium text-earth-400' : 'font-bold text-earth-700'}`}>
                                {msg.subject}
                              </td>
                              <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 hidden sm:table-cell">
                                <span className={`text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 rounded-full inline-block ${msg.is_read ? 'text-earth-500 bg-earth-50' : 'text-savanna-600 bg-savanna-50'}`}>
                                  {msg.is_read ? 'Read' : 'Unread'}
                                </span>
                              </td>
                              <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 hidden sm:table-cell">
                                <span className={`text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-500 bg-earth-50 px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 rounded-full inline-block ${!msg.is_read ? 'ring-1 ring-earth-200' : ''}`}>
                                  {new Date(msg.created_at).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => handleViewItem('contact', msg)}
                                    className="px-3 xs:px-4 py-1.5 xs:py-2 bg-earth-50 text-earth-900 hover:bg-savanna-500 hover:text-white border border-earth-100 rounded-md xs:rounded-lg sm:rounded-xl transition-all text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-widest active:scale-95"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={() => handleDelete('contact', msg.id, msg.full_name || msg.email)}
                                    className="p-1.5 xs:p-2 bg-earth-50 text-earth-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-md xs:rounded-lg sm:rounded-xl transition-all active:scale-95"
                                    title="Delete Message"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 xs:py-12 sm:py-16 lg:py-20">
                  <Mail className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 text-earth-200 mx-auto mb-3 xs:mb-4" />
                  <p className="text-earth-400 font-medium text-sm xs:text-base">No contact messages yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Partnerships Tab */}
          {activeTab === 'partnerships' && (
            <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-[3rem] border border-earth-100 shadow-xl p-3 xs:p-4 sm:p-6 lg:p-10 animate-fade-up">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 xs:mb-6 sm:mb-8 lg:mb-10 gap-3 xs:gap-4">
                <h3 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-earth-900 leading-tight">Partnership Inquiries</h3>
                <div className="flex gap-2 w-full xs:w-auto">
                  {selectedIds.length > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="bg-red-500 text-white px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <Trash2 size={14} /> Delete ({selectedIds.length})
                    </button>
                  )}
                  <button
                    onClick={fetchPartnerships}
                    className="bg-earth-50 text-earth-900 px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-earth-100 transition-all flex-grow xs:flex-grow-0 active:scale-95"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {partnerships.length > 0 ? (
                <>
                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {getFilteredData(partnerships).map((inquiry: any) => (
                      <div key={inquiry.id} className={`bg-earth-50/50 rounded-2xl p-4 border border-earth-100 space-y-4 relative ${!inquiry.is_read ? 'border-l-4 border-savanna-500' : ''}`}>
                        <div className="flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-black text-earth-900 text-sm leading-tight truncate">{inquiry.organization_name}</h4>
                              {!inquiry.is_read && <span className="w-2 h-2 rounded-full bg-savanna-500 animate-pulse"></span>}
                            </div>
                            <p className="text-[10px] text-earth-500 font-bold uppercase tracking-widest">{inquiry.partnership_type}</p>
                          </div>
                          {!inquiry.is_read && (
                            <span className="text-[8px] font-black uppercase tracking-widest text-savanna-600 bg-savanna-50 px-2 py-1 rounded-full border border-savanna-100">New</span>
                          )}
                        </div>

                        <div className="bg-white/50 rounded-xl p-3 border border-earth-100/50">
                          <p className="text-[9px] font-black uppercase tracking-widest text-earth-400 mb-1">Contact Person</p>
                          <p className="text-[11px] font-bold text-earth-700 leading-tight">{inquiry.contact_person}</p>
                          <p className="text-[9px] text-earth-400 mt-0.5">{inquiry.email}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex gap-2 w-full">
                            <button
                              onClick={() => handleViewItem('partnerships', inquiry)}
                              className="flex-grow flex items-center justify-center gap-2 py-2 bg-earth-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                            >
                              <Eye size={12} /> View Inquiry
                            </button>
                            <button
                              onClick={() => handleDelete('partnerships', inquiry.id, inquiry.organization_name)}
                              className="w-12 h-10 flex items-center justify-center bg-white text-red-600 border border-red-50 rounded-xl transition-all active:scale-95"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                      <table className="w-full text-left min-w-[600px] sm:min-w-[800px]">
                        <thead className="bg-earth-50/50 text-earth-400 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                          <tr>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 w-10">
                              <input
                                type="checkbox"
                                checked={selectedIds.length === partnerships.length && partnerships.length > 0}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedIds(partnerships.map(p => p.id));
                                  } else {
                                    setSelectedIds([]);
                                  }
                                }}
                                className="rounded border-earth-300 text-savanna-500 focus:ring-savanna-500"
                              />
                            </th>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 font-black">Organization</th>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 hidden md:table-cell font-black">Program</th>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 hidden md:table-cell font-black">Status</th>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 hidden md:table-cell font-black">Contact</th>
                            <th className="px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 text-right font-black">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-earth-50">
                          {getFilteredData(partnerships).map((inquiry: any) => (
                            <tr key={inquiry.id} className={`hover:bg-earth-50/20 transition-colors group ${selectedIds.includes(inquiry.id) ? 'bg-savanna-50/30' : ''} ${!inquiry.is_read ? 'border-l-4 border-savanna-500 bg-savanna-50/10' : ''}`}>
                              <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(inquiry.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedIds(prev => [...prev, inquiry.id]);
                                    } else {
                                      setSelectedIds(prev => prev.filter(id => id !== inquiry.id));
                                    }
                                  }}
                                  className="rounded border-earth-300 text-savanna-500 focus:ring-savanna-500"
                                />
                              </td>
                              <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6">
                                <p className={`${inquiry.is_read ? 'font-medium text-earth-600' : 'font-black text-earth-900'} text-[11px] xs:text-xs sm:text-sm lg:text-base group-hover:text-savanna-500 transition-colors leading-tight`}>{inquiry.organization_name}</p>
                                <p className="text-[9px] xs:text-[10px] sm:text-xs text-earth-400 mt-1">{inquiry.partnership_type}</p>
                              </td>
                              <td className={`px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 text-[11px] xs:text-xs sm:text-sm hidden md:table-cell ${inquiry.is_read ? 'font-medium text-earth-400' : 'font-bold text-earth-700'}`}>
                                {inquiry.program_details?.title || 'N/A'}
                              </td>
                              <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 hidden sm:table-cell">
                                <span className={`text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 rounded-full inline-block ${inquiry.is_read ? 'text-earth-500 bg-earth-50' : 'text-savanna-600 bg-savanna-50'}`}>
                                  {inquiry.is_read ? 'Read' : 'Unread'}
                                </span>
                              </td>
                              <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 text-[11px] xs:text-xs sm:text-sm text-earth-600 font-medium hidden md:table-cell">
                                {inquiry.contact_person}<br />
                                <span className="text-[9px] text-earth-400">{inquiry.email}</span>
                              </td>
                              <td className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 lg:py-6 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => handleViewItem('partnerships', inquiry)}
                                    className="px-3 xs:px-4 py-1.5 xs:py-2 bg-earth-50 text-earth-900 hover:bg-savanna-500 hover:text-white border border-earth-100 rounded-md xs:rounded-lg sm:rounded-xl transition-all text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-widest active:scale-95"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={() => handleDelete('partnerships', inquiry.id, inquiry.organization_name)}
                                    className="p-1.5 xs:p-2 bg-earth-50 text-earth-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-md xs:rounded-lg sm:rounded-xl transition-all active:scale-95"
                                    title="Delete Inquiry"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 xs:py-12 sm:py-16 lg:py-20">
                  <MessageSquare className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 text-earth-200 mx-auto mb-3 xs:mb-4" />
                  <p className="text-earth-400 font-medium text-sm xs:text-base">No partnership inquiries yet.</p>
                </div>
              )}
            </div>
          )}

        </main>

        {/* CRUD Modal */}
        {
          editingItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 xs:p-4 sm:p-6">
              <div className="absolute inset-0 bg-earth-900/80 backdrop-blur-md" onClick={() => setEditingItem(null)}></div>
              <div className="relative bg-white w-full max-w-3xl rounded-xl xs:rounded-2xl sm:rounded-[3rem] shadow-2xl overflow-hidden animate-fade-up max-h-[90vh] overflow-y-auto">
                <div className="p-4 xs:p-6 sm:p-8 lg:p-12 xl:p-14">
                  <div className="flex justify-between items-start mb-4 xs:mb-6 sm:mb-8 lg:mb-10 gap-3 xs:gap-4">
                    <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-serif font-black text-earth-900 leading-tight">
                      {['volunteers', 'contact', 'partnerships'].includes(editingItem.type) ? 'Information Details' : (editingItem.data.id ? 'Edit' : 'Add')} <span className="text-savanna-500">{
                        editingItem.type === 'news' ? 'Post' :
                          editingItem.type === 'contact' ? 'Message' :
                            editingItem.type === 'partnerships' ? 'Partnership' :
                              editingItem.type === 'impact-stories' ? 'Story' :
                                editingItem.type.slice(0, -1)
                      }</span>
                    </h3>
                    <button onClick={() => setEditingItem(null)} className="p-1.5 xs:p-2 text-earth-300 hover:text-earth-900 flex-shrink-0 transition-colors">
                      <X size={18} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>

                  {['volunteers', 'contact', 'partnerships'].includes(editingItem.type) ? (
                    <div className="space-y-4 xs:space-y-5 sm:space-y-6 lg:space-y-8">
                      {editingItem.type === 'volunteers' && (
                        <div className="space-y-4 xs:space-y-5 sm:space-y-6 lg:space-y-8">
                          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Full Name</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg break-words">{editingItem.data.full_name}</p>
                            </div>
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Email Address</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg break-all">{editingItem.data.email}</p>
                            </div>
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Phone</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg">{editingItem.data.phone}</p>
                            </div>
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Location</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg break-words">{editingItem.data.location}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Area of Interest</p>
                            <p className="font-bold text-earth-900 bg-savanna-50 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg xs:rounded-xl inline-block text-xs xs:text-sm sm:text-base">{editingItem.data.area_of_interest}</p>
                          </div>
                          <div>
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Availability</p>
                            <p className="font-bold text-earth-900 text-xs xs:text-sm sm:text-base">{editingItem.data.availability}</p>
                          </div>
                          <div>
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Skills & Expertise</p>
                            <p className="text-earth-700 leading-relaxed italic text-xs xs:text-sm sm:text-base">"{editingItem.data.skills || 'None provided'}"</p>
                          </div>
                          <div>
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Motivation Statement</p>
                            <div className="bg-earth-50 p-3 xs:p-4 sm:p-5 lg:p-6 rounded-lg xs:rounded-xl sm:rounded-2xl border border-earth-100">
                              <p className="text-earth-700 leading-relaxed font-medium text-xs xs:text-sm sm:text-base">{editingItem.data.motivation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {editingItem.type === 'contact' && (
                        <div className="space-y-4 xs:space-y-5 sm:space-y-6 lg:space-y-8">
                          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Sender Name</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg">{editingItem.data.full_name}</p>
                            </div>
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Email Address</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg break-all">{editingItem.data.email}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Subject</p>
                            <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg">{editingItem.data.subject}</p>
                          </div>
                          <div>
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Message Content</p>
                            <div className="bg-earth-50 p-3 xs:p-4 sm:p-5 lg:p-6 rounded-lg xs:rounded-xl sm:rounded-2xl border border-earth-100">
                              <p className="text-earth-700 leading-relaxed font-medium text-xs xs:text-sm sm:text-base whitespace-pre-wrap">{editingItem.data.message}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {editingItem.type === 'partnerships' && (
                        <div className="space-y-4 xs:space-y-5 sm:space-y-6 lg:space-y-8">
                          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Organization</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg">{editingItem.data.organization_name}</p>
                            </div>
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Partnership Type</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg">{editingItem.data.partnership_type}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Related Program</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg">{editingItem.data.program_details?.title || 'General Partnership'}</p>
                            </div>
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Contact Person</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg">{editingItem.data.contact_person}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Email Address</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg break-all">{editingItem.data.email}</p>
                            </div>
                            <div>
                              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Phone Number</p>
                              <p className="font-bold text-earth-900 text-sm xs:text-base sm:text-lg">{editingItem.data.phone}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 mb-1.5 xs:mb-2">Proposal / Message</p>
                            <div className="bg-earth-50 p-3 xs:p-4 sm:p-5 lg:p-6 rounded-lg xs:rounded-xl sm:rounded-2xl border border-earth-100">
                              <p className="text-earth-700 leading-relaxed font-medium text-xs xs:text-sm sm:text-base whitespace-pre-wrap">{editingItem.data.message}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => setEditingItem(null)}
                        className="w-full bg-earth-900 hover:bg-savanna-500 text-white py-3 xs:py-4 sm:py-5 rounded-lg xs:rounded-xl sm:rounded-2xl font-black text-sm xs:text-base sm:text-lg transition-all shadow-xl active:scale-95"
                      >
                        Close Information Details
                      </button>
                    </div>
                  ) : (
                    <form className="space-y-3 xs:space-y-4 sm:space-y-5 lg:space-y-6" onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);

                      // If image input is empty (size 0), remove it so backend keeps existing image
                      const imageFile = formData.get('image');
                      if (imageFile instanceof File && imageFile.size === 0) {
                        formData.delete('image');
                      }

                      // Handle booleans for FormData
                      if (editingItem.type === 'news') {
                        formData.set('is_published', formData.get('is_published') === 'on' ? 'true' : 'false');
                      }
                      if (editingItem.type === 'impact-stories') {
                        formData.set('is_featured', formData.get('is_featured') === 'on' ? 'true' : 'false');
                      }

                      try {
                        let response;
                        const type = editingItem.type;
                        const endpoint = type;

                        // For projects, ensure program is an integer
                        if (type === 'projects' && formData.get('program')) {
                          // Projects still use JSON-like data in this dashboard structure, 
                          // but if we are switching to FormData, we should be consistent.
                        }

                        const config = {
                          headers: { 'Content-Type': 'multipart/form-data' }
                        };

                        if (editingItem.data.id) {
                          // Use PATCH for partial updates (so we don't wipe existing images if not provided)
                          response = await api.patch(`${endpoint}/${editingItem.data.id}/`, formData, config);
                        } else {
                          response = await api.post(`${endpoint}/`, formData, config);
                        }

                        if (type === 'programs') fetchPrograms();
                        if (type === 'projects') fetchProjects();
                        if (type === 'news') fetchNews();
                        if (type === 'impact-stories') fetchImpactStories();

                        fetchSummary();
                        setEditingItem(null);
                      } catch (err: any) {
                        console.error(`Failed to save ${editingItem.type}`, err);
                        console.error('Error response:', err.response?.data);
                        const errorMsg = err.response?.data ? JSON.stringify(err.response.data, null, 2) : 'Please check your inputs.';
                        alert(`Failed to save ${editingItem.type}.\n\nError details:\n${errorMsg}`);
                      }
                    }}>
                      <div className="space-y-1.5 xs:space-y-2">
                        <label className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 ml-2 xs:ml-3 sm:ml-4">Title</label>
                        <input
                          name="title"
                          defaultValue={editingItem.data.title}
                          required
                          className="w-full bg-earth-50 border-2 border-transparent rounded-lg xs:rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all text-xs xs:text-sm sm:text-base"
                        />
                      </div>

                      {editingItem.type === 'projects' && (
                        <>
                          <div className="space-y-1.5 xs:space-y-2">
                            <label className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 ml-2 xs:ml-3 sm:ml-4">Parent Program *</label>
                            <select
                              name="program"
                              defaultValue={editingItem.data.program || ""}
                              required
                              className="w-full bg-earth-50 border-2 border-transparent rounded-lg xs:rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all text-xs xs:text-sm sm:text-base"
                            >
                              <option value="" disabled>-- Select a Program --</option>
                              {programsList.map(p => (
                                <option key={p.id} value={p.id}>{p.title}</option>
                              ))}
                            </select>
                            {programsList.length === 0 && (
                              <p className="text-xs text-red-500 ml-2">No programs available. Please create a program first.</p>
                            )}
                          </div>
                          <div className="space-y-1.5 xs:space-y-2">
                            <label className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 ml-2 xs:ml-3 sm:ml-4">Location *</label>
                            <input
                              name="location"
                              defaultValue={editingItem.data.location}
                              placeholder="e.g. Juba, Central Equatoria"
                              required
                              className="w-full bg-earth-50 border-2 border-transparent rounded-lg xs:rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all text-xs xs:text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-1.5 xs:space-y-2">
                            <label className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 ml-2 xs:ml-3 sm:ml-4">Status *</label>
                            <select
                              name="status"
                              defaultValue={editingItem.data.status || "Ongoing"}
                              required
                              className="w-full bg-earth-50 border-2 border-transparent rounded-lg xs:rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all text-xs xs:text-sm sm:text-base"
                            >
                              <option value="Ongoing">Ongoing</option>
                              <option value="Completed">Completed</option>
                              <option value="Planned">Planned</option>
                            </select>
                          </div>
                          <div className="space-y-1.5 xs:space-y-2">
                            <label className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 ml-2 xs:ml-3 sm:ml-4">Project Image</label>
                            <input
                              type="file"
                              name="image"
                              accept="image/*"
                              className="w-full bg-earth-50 border-2 border-transparent rounded-lg xs:rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all text-xs xs:text-sm sm:text-base"
                            />
                            {editingItem.data.image && (
                              <div className="ml-4 mt-2 flex items-start gap-4">
                                <img src={editingItem.data.image} alt="Current" className="w-20 h-20 object-cover rounded-lg border-2 border-earth-200" />
                                <div className="flex flex-col gap-1">
                                  <p className="text-[10px] uppercase tracking-widest text-savanna-600 font-black flex items-center gap-1">
                                    <CheckCircle size={12} /> Active Image
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      <div className="space-y-1.5 xs:space-y-2">
                        <textarea
                          name={editingItem.type === 'news' || editingItem.type === 'impact-stories' ? 'summary' : 'description'}
                          defaultValue={editingItem.data.summary || editingItem.data.description}
                          rows={3}
                          required
                          className="w-full bg-earth-50 border-2 border-transparent rounded-lg xs:rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all text-xs xs:text-sm sm:text-base resize-none"
                        ></textarea>
                      </div>

                      {(editingItem.type === 'news' || editingItem.type === 'impact-stories') && (
                        <>
                          <div className="space-y-1.5 xs:space-y-2">
                            <label className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 ml-2 xs:ml-3 sm:ml-4">Full Content</label>
                            <textarea
                              name="content"
                              defaultValue={editingItem.data.content}
                              rows={8}
                              required
                              className="w-full bg-earth-50 border-2 border-transparent rounded-lg xs:rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all text-xs xs:text-sm sm:text-base resize-none"
                            ></textarea>
                          </div>
                          {editingItem.type === 'news' && (
                            <div className="space-y-1.5 xs:space-y-2">
                              <label className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 ml-2 xs:ml-3 sm:ml-4">Image Attachment</label>
                              <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="w-full bg-earth-50 border-2 border-transparent rounded-lg xs:rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all text-xs xs:text-sm sm:text-base"
                              />
                              {editingItem.data.image && (
                                <div className="ml-4 mt-2 flex items-start gap-4">
                                  <img src={editingItem.data.image} alt="Current" className="w-20 h-20 object-cover rounded-lg border-2 border-earth-200" />
                                  <div className="flex flex-col gap-1">
                                    <p className="text-[10px] uppercase tracking-widest text-savanna-600 font-black flex items-center gap-1">
                                      <CheckCircle size={12} /> Active Image
                                    </p>
                                    <p className="text-[10px] text-earth-400 font-medium max-w-[200px]">
                                      This image is currently live. Choose a new file above only if you want to replace it.
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="flex items-center gap-2 ml-4">
                            <input
                              type="checkbox"
                              name={editingItem.type === 'news' ? 'is_published' : 'is_featured'}
                              defaultChecked={editingItem.type === 'news' ? (editingItem.data.is_published !== false) : editingItem.data.is_featured}
                              className="w-4 h-4 text-savanna-500 rounded border-earth-300 focus:ring-savanna-500"
                            />
                            <label className="text-xs font-bold text-earth-600 uppercase tracking-widest">
                              {editingItem.type === 'news' ? 'Publish Immediately' : 'Feature this story'}
                            </label>
                          </div>
                        </>
                      )}

                      {editingItem.type === 'programs' && (
                        <div className="space-y-1.5 xs:space-y-2">
                          <label className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-earth-400 ml-2 xs:ml-3 sm:ml-4">Objectives</label>
                          <textarea
                            name="objectives"
                            defaultValue={editingItem.data.objectives}
                            rows={3}
                            className="w-full bg-earth-50 border-2 border-transparent rounded-lg xs:rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-3 lg:py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all text-xs xs:text-sm sm:text-base resize-none"
                          ></textarea>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-earth-900 hover:bg-savanna-500 text-white py-3 xs:py-4 sm:py-5 rounded-lg xs:rounded-xl sm:rounded-2xl font-black text-sm xs:text-base sm:text-lg flex items-center justify-center gap-2 xs:gap-3 transition-all shadow-xl active:scale-95"
                      >
                        <Save size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" /> Save {
                          editingItem.type === 'impact-stories' ? 'Impact Story' :
                            editingItem.type === 'news' ? 'News Item' :
                              editingItem.type.slice(0, -1)
                        }
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )
        }
        {/* Delete Confirmation Modal */}
        {
          deleteConfirm && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-earth-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setDeleteConfirm(null)}></div>
              <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-fade-up">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Trash2 size={40} />
                  </div>
                  <h3 className="text-2xl font-serif font-black text-earth-900 mb-2">Confirm Delete</h3>
                  <p className="text-earth-600 mb-8 px-4 font-medium leading-relaxed">
                    Are you sure you want to delete <span className="text-earth-900 font-bold">"{deleteConfirm.title || 'this item'}"</span>? This action cannot be undone.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={performDelete}
                      className="w-full py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95"
                    >
                      Delete Permanently
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="w-full py-4 bg-earth-50 text-earth-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-earth-100 transition-all active:scale-95"
                    >
                      Cancel & Keep
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div >
    </div >
  );
}

export default AdminDashboard; // Added default export