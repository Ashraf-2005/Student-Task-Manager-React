import { useState } from "react";

const initialTasks = [
  { id: 1, title: "Complete React Assignment", description: "Finish the React project given in class", deadline: "2026-03-10", status: "Pending" },
  { id: 2, title: "Prepare for Coding Test", description: "Practice arrays and strings problems", deadline: "2026-03-08", status: "Completed" },
  { id: 3, title: "Read Java OOP Concepts", description: "Revise inheritance and polymorphism", deadline: "2026-03-12", status: "Pending" },
];

function getDaysLeft(deadline) {
  const today = new Date();
  const d = new Date(deadline);
  const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function StudentTaskManager() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;

  const filtered = filter === "All" ? tasks : tasks.filter(t => t.status === filter);

  function addTask() {
    if (!title.trim() || !deadline) { setError("Please fill in both title and deadline."); return; }
    setError("");
    setTasks([...tasks, { id: Date.now(), title: title.trim(), deadline, status }]);
    setTitle(""); setDeadline(""); setStatus("Pending");
  }

  function deleteTask(id) { setTasks(tasks.filter(t => t.id !== id)); }

  function toggleStatus(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "Pending" ? "Completed" : "Pending" } : t));
  }

  const style = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: #f0f2f5;
      min-height: 100vh;
    }

    .stm-root {
      min-height: 100vh;
      background: #f0f2f5;
      padding: 40px 20px 60px;
    }

    .stm-wrap {
      max-width: 900px;
      margin: 0 auto;
    }

    /* Header */
    .stm-header {
      margin-bottom: 36px;
    }
    .stm-header-top {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 6px;
    }
    .stm-icon {
      width: 46px;
      height: 46px;
      background: #0f172a;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .stm-icon svg { color: #e2e8f0; }
    .stm-title {
      font-family: 'Playfair Display', serif;
      font-size: 32px;
      color: #0f172a;
      letter-spacing: -0.5px;
      line-height: 1;
    }
    .stm-sub {
      font-size: 14px;
      color: #64748b;
      font-weight: 400;
      margin-left: 62px;
    }

    /* Stats */
    .stm-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 28px;
    }
    .stm-stat {
      background: #fff;
      border-radius: 14px;
      padding: 22px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
      border: 1px solid #e8ecf0;
      position: relative;
      overflow: hidden;
    }
    .stm-stat::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
    }
    .stm-stat.total::before { background: #0f172a; }
    .stm-stat.done::before { background: #10b981; }
    .stm-stat.pend::before { background: #f59e0b; }

    .stm-stat-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .stm-stat-num {
      font-family: 'Playfair Display', serif;
      font-size: 38px;
      color: #0f172a;
      line-height: 1;
    }

    /* Card */
    .stm-card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
      border: 1px solid #e8ecf0;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .stm-card-header {
      padding: 20px 24px 16px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .stm-card-title {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #475569;
    }

    /* Form */
    .stm-form {
      padding: 20px 24px 24px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: flex-end;
    }
    .stm-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .stm-field label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: #94a3b8;
    }
    .stm-field.grow { flex: 1; min-width: 180px; }
    .stm-input {
      height: 42px;
      padding: 0 14px;
      border: 1.5px solid #e2e8f0;
      border-radius: 9px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: #0f172a;
      background: #fafbfc;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      width: 100%;
    }
    .stm-input:focus {
      border-color: #0f172a;
      box-shadow: 0 0 0 3px rgba(15,23,42,0.07);
      background: #fff;
    }
    .stm-select {
      height: 42px;
      padding: 0 14px;
      border: 1.5px solid #e2e8f0;
      border-radius: 9px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: #0f172a;
      background: #fafbfc;
      outline: none;
      cursor: pointer;
      transition: border-color 0.15s;
      min-width: 130px;
    }
    .stm-select:focus { border-color: #0f172a; }

    .stm-btn-add {
      height: 42px;
      padding: 0 22px;
      background: #0f172a;
      color: #fff;
      border: none;
      border-radius: 9px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.02em;
      transition: background 0.15s, transform 0.1s;
      white-space: nowrap;
      align-self: flex-end;
    }
    .stm-btn-add:hover { background: #1e293b; transform: translateY(-1px); }
    .stm-btn-add:active { transform: translateY(0); }

    .stm-error {
      margin: 0 24px 16px;
      padding: 10px 14px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      font-size: 13px;
      color: #dc2626;
    }

    /* Filter tabs */
    .stm-filters {
      display: flex;
      gap: 6px;
    }
    .stm-filter-btn {
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      border: 1.5px solid transparent;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.15s;
    }
    .stm-filter-btn.active {
      background: #0f172a;
      color: #fff;
      border-color: #0f172a;
    }
    .stm-filter-btn:not(.active) {
      background: #f1f5f9;
      color: #64748b;
      border-color: #e2e8f0;
    }
    .stm-filter-btn:not(.active):hover { background: #e2e8f0; color: #334155; }

    /* Table */
    .stm-table-wrap { overflow-x: auto; }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    thead tr {
      background: #f8fafc;
      border-bottom: 1px solid #e8ecf0;
    }
    th {
      padding: 12px 20px;
      text-align: left;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: #94a3b8;
    }
    td {
      padding: 16px 20px;
      font-size: 14px;
      color: #1e293b;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
    }
    tbody tr:last-child td { border-bottom: none; }
    tbody tr:hover td { background: #f8fafc; }

    .stm-task-title { font-weight: 500; color: #0f172a; }

    .stm-deadline { font-size: 13px; color: #64748b; }
    .stm-deadline-warn { color: #ef4444; font-weight: 600; }
    .stm-deadline-soon { color: #f59e0b; font-weight: 500; }

    .stm-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .stm-badge.pending {
      background: #fef3c7;
      color: #92400e;
    }
    .stm-badge.completed {
      background: #d1fae5;
      color: #065f46;
    }
    .stm-badge-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .pending .stm-badge-dot { background: #f59e0b; }
    .completed .stm-badge-dot { background: #10b981; }

    .stm-actions { display: flex; gap: 8px; }

    .stm-btn-complete {
      padding: 6px 14px;
      border-radius: 7px;
      font-size: 12px;
      font-weight: 600;
      border: 1.5px solid #e2e8f0;
      background: #fff;
      color: #475569;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.15s;
    }
    .stm-btn-complete:hover { border-color: #10b981; color: #10b981; background: #f0fdf4; }

    .stm-btn-delete {
      padding: 6px 10px;
      border-radius: 7px;
      font-size: 12px;
      font-weight: 600;
      border: 1.5px solid #e2e8f0;
      background: #fff;
      color: #94a3b8;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.15s;
    }
    .stm-btn-delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

    .stm-empty {
      padding: 48px 24px;
      text-align: center;
      color: #94a3b8;
      font-size: 14px;
    }
    .stm-empty-icon { font-size: 32px; margin-bottom: 10px; }
  `;

  return (
    <>
      <style>{style}</style>
      <div className="stm-root">
        <div className="stm-wrap">

          {/* Header */}
          <div className="stm-header">
            <div className="stm-header-top">
              <div className="stm-icon">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h1 className="stm-title">Student Task Manager</h1>
            </div>
            <p className="stm-sub">Track your assignments, deadlines, and progress in one place.</p>
          </div>

          {/* Stats */}
          <div className="stm-stats">
            <div className="stm-stat total">
              <div className="stm-stat-label">Total Tasks</div>
              <div className="stm-stat-num">{total}</div>
            </div>
            <div className="stm-stat done">
              <div className="stm-stat-label">Completed</div>
              <div className="stm-stat-num">{completed}</div>
            </div>
            <div className="stm-stat pend">
              <div className="stm-stat-label">Pending</div>
              <div className="stm-stat-num">{pending}</div>
            </div>
          </div>

          {/* Add Task */}
          <div className="stm-card">
            <div className="stm-card-header">
              <span className="stm-card-title">Add New Task</span>
            </div>
            <div className="stm-form">
              <div className="stm-field grow">
                <label>Task Title</label>
                <input className="stm-input" placeholder="e.g. Complete React Assignment" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="stm-field">
                <label>Deadline</label>
                <input type="date" className="stm-input" value={deadline} onChange={e => setDeadline(e.target.value)} style={{minWidth: 150}} />
              </div>
              <div className="stm-field">
                <label>Status</label>
                <select className="stm-select" value={status} onChange={e => setStatus(e.target.value)}>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>
              <button className="stm-btn-add" onClick={addTask}>Add Task</button>
            </div>
            {error && <div className="stm-error">{error}</div>}
          </div>

          {/* Task List */}
          <div className="stm-card">
            <div className="stm-card-header">
              <span className="stm-card-title">Tasks List</span>
              <div className="stm-filters">
                {["All", "Pending", "Completed"].map(f => (
                  <button key={f} className={`stm-filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
                ))}
              </div>
            </div>
            <div className="stm-table-wrap">
              {filtered.length === 0 ? (
                <div className="stm-empty">
                  <div className="stm-empty-icon">📋</div>
                  No tasks found.
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Deadline</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(task => {
                      const days = getDaysLeft(task.deadline);
                      const deadlineClass = task.status === "Completed" ? "stm-deadline" : days < 0 ? "stm-deadline stm-deadline-warn" : days <= 2 ? "stm-deadline stm-deadline-soon" : "stm-deadline";
                      const deadlineLabel = task.status === "Completed" ? task.deadline : days < 0 ? `${task.deadline} (overdue)` : days === 0 ? `${task.deadline} (today!)` : days === 1 ? `${task.deadline} (tomorrow)` : task.deadline;
                      return (
                        <tr key={task.id}>
                          <td><span className="stm-task-title">{task.title}</span></td>
                          <td><span className={deadlineClass}>{deadlineLabel}</span></td>
                          <td>
                            <span className={`stm-badge ${task.status === "Completed" ? "completed" : "pending"}`}>
                              <span className="stm-badge-dot" />
                              {task.status}
                            </span>
                          </td>
                          <td>
                            <div className="stm-actions">
                              <button className="stm-btn-complete" onClick={() => toggleStatus(task.id)}>
                                {task.status === "Pending" ? "Mark Done" : "Reopen"}
                              </button>
                              <button className="stm-btn-delete" onClick={() => deleteTask(task.id)}>✕</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
