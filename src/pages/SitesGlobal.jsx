// src/pages/SitesGlobal.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api';

export default function SitesGlobal(){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');

  const load = async () => {
    const { data } = await api.get('/sa/sites');
    setItems(data);
  };
  useEffect(()=>{ load(); },[]);

  const filtered = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(it =>
      (it.code || '').toLowerCase().includes(s) ||
      (it.name || '').toLowerCase().includes(s) ||
      (it.enterprise_name || '').toLowerCase().includes(s)
    );
  }, [q, items]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sites (global)</h1>
      <div className="mb-4">
        <input
          className="bg-slate-800 p-2 rounded w-full max-w-md"
          placeholder="Rechercher (code, nom, entreprise)"
          value={q} onChange={e=>setQ(e.target.value)}
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="p-2">Entreprise</th>
            <th className="p-2">Code</th>
            <th className="p-2">Nom</th>
            <th className="p-2">Créé</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(it=>(
            <tr key={it.id} className="border-t border-slate-800">
              <td className="p-2">{it.enterprise_name}</td>
              <td className="p-2">{it.code}</td>
              <td className="p-2">{it.name || '—'}</td>
              <td className="p-2">{new Date(it.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
