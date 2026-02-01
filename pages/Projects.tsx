import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { MapPin, Calendar, Building2, CheckCircle, Image as ImageIcon } from 'lucide-react';
import api from '../api';

export const Projects: React.FC = () => {
  const [dynamicProjects, setDynamicProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('projects/');
        setDynamicProjects(response.data.results || response.data);
      } catch (err) {
        console.error('Failed to fetch dynamic projects', err);
      }
    };
    fetchProjects();
  }, []);

  // Use dynamic projects from the database
  const allProjects = dynamicProjects.map(p => ({
    ...p,
    // Use backend status directly if it's one of the expected filter values, 
    // otherwise fallback to a normalized version for filtering
    status: (p.status?.toLowerCase() === 'completed') ? 'completed' : 'ongoing',
    displayStatus: p.status || 'Ongoing',
    image: p.image || ''
  }));

  // Remove duplicates by title if any (to avoid showing static + dynamic same project if manually added)
  const uniqueProjects = allProjects.filter((p, index, self) =>
    index === self.findIndex((t) => t.title === p.title)
  );

  const filteredProjects = filter === 'all' ? uniqueProjects : uniqueProjects.filter(p => p.status === filter);

  return (
    <div className="pt-32 pb-24 savanna-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif text-earth-900 mb-4 tracking-tighter">South Sudan <span className="text-gradient">Projects</span></h1>
            <p className="text-earth-600 text-lg">Measurable impact in South Sudan's rural heartlands.</p>
          </div>

          <div className="flex gap-2 bg-white p-1 rounded-2xl border border-earth-100 shadow-sm">
            {(['all', 'ongoing', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${filter === f ? 'bg-earth-900 text-white shadow-lg' : 'text-earth-400 hover:text-earth-900'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-[3rem] overflow-hidden border border-earth-100 flex flex-col md:flex-row shadow-sm group hover:shadow-xl transition-all duration-500">
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden bg-earth-100 flex items-center justify-center relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-earth-50">
                  <ImageIcon size={32} className="text-earth-300 mb-3" />
                  <code className="text-[8px] text-earth-400 bg-white px-2 py-1 rounded border border-earth-100 truncate w-full text-center">
                    {project.image || 'No Image Provided'}
                  </code>
                </div>
                {project.image && (
                  <img
                    src={project.image}
                    className="w-full h-full object-cover relative z-10"
                    alt={project.title}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
              </div>
              <div className="md:w-3/5 p-10 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'ongoing' ? 'bg-savanna-100 text-savanna-700' : 'bg-earth-100 text-earth-700'
                    }`}>
                    {project.displayStatus || project.status}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-earth-900 mb-4">{project.title}</h3>
                <div className="space-y-3 mb-6 text-sm text-earth-500">
                  <div className="flex items-center gap-3"><MapPin size={14} className="text-savanna-500" /> {project.location}</div>
                  {project.duration && project.duration !== 'Ongoing' && (
                    <div className="flex items-center gap-3"><Calendar size={14} className="text-savanna-500" /> {project.duration}</div>
                  )}
                </div>
                <p className="text-earth-600 text-sm mb-6 leading-relaxed flex-grow">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-earth-200">
            <p className="text-earth-400 font-medium">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
