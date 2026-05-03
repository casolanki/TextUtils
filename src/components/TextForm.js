import React, { useState } from 'react';

export default function TextForm(props) {
    const [text, setText] = useState('');

    const isDark = props.mode === 'dark';
    const cardBg    = isDark ? '#0d2e4a' : '#ffffff';
    const cardBorder= isDark ? '1px solid #1e4f72' : '1px solid #dee2e6';
    const textColor = isDark ? '#e8f4fd' : '#042743';
    const areaBg    = isDark ? '#0a2035' : '#f8fbff';
    const statBg    = isDark ? '#0f3354' : '#eaf4ff';

    /* ── handlers ── */
    const handleOnChange    = e => setText(e.target.value);
    const handleUpClick     = () => { setText(text.toUpperCase());  props.showAlert("Converted to UPPERCASE!", "success"); };
    const handleLoClick     = () => { setText(text.toLowerCase());  props.showAlert("Converted to lowercase!", "success"); };
    const handleClearClick  = () => { setText('');                  props.showAlert("Text cleared!", "success"); };
    const handleCopy        = () => { navigator.clipboard.writeText(text); props.showAlert("Copied to clipboard!", "success"); };
    const handleExtraSpaces = () => { setText(text.split(/[ ]+/).join(" ")); props.showAlert("Extra spaces removed!", "success"); };

    const handleTitleCase = () => {
        setText(text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()));
        props.showAlert("Converted to Title Case!", "success");
    };

    const handleSentenceCase = () => {
        setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
        props.showAlert("Converted to Sentence case!", "success");
    };

    const handleReverse = () => {
        setText(text.split('').reverse().join(''));
        props.showAlert("Text reversed!", "success");
    };

    /* ── derived stats ── */
    const words    = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars    = text.length;
    const sentences= text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const readTime = (words / 200).toFixed(2);

    /* ── action buttons config ── */
    const actions = [
        { label: '🔠 UPPERCASE',      fn: handleUpClick,      color: '#4f46e5' },
        { label: '🔡 lowercase',       fn: handleLoClick,      color: '#0891b2' },
        { label: '📝 Title Case',      fn: handleTitleCase,    color: '#0d9488' },
        { label: '✏️ Sentence case',   fn: handleSentenceCase, color: '#7c3aed' },
        { label: '🔄 Reverse',         fn: handleReverse,      color: '#b45309' },
        { label: '📋 Copy',            fn: handleCopy,         color: '#16a34a' },
        { label: '🧹 Remove Spaces',   fn: handleExtraSpaces,  color: '#dc2626' },
        { label: '🗑️ Clear',           fn: handleClearClick,   color: '#6b7280' },
    ];

    return (
        <div className="container py-4" style={{ color: textColor }}>

            {/* ── Heading ── */}
            <div className="text-center mb-4">
                <h1 style={{
                    fontWeight: 700,
                    fontSize: '1.8rem',
                    background: 'linear-gradient(135deg, #4f46e5, #0891b2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    ✨ {props.heading}
                </h1>
                <p style={{ color: isDark ? '#90caf9' : '#546e7a', fontSize: '0.95rem' }}>
                    Your smart text transformation toolkit
                </p>
            </div>

            {/* ── Textarea Card ── */}
            <div className="mb-3 p-4 rounded-4 shadow-sm" style={{
                background: cardBg,
                border: cardBorder,
            }}>
                <label htmlFor="myBox" style={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: isDark ? '#90caf9' : '#4f46e5',
                    marginBottom: '8px',
                    display: 'block',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                }}>
                    📄 Enter Your Text
                </label>
                <textarea
                    id="myBox"
                    className="form-control"
                    rows="10"
                    value={text}
                    onChange={handleOnChange}
                    placeholder="Start typing or paste your text here..."
                    style={{
                        background: areaBg,
                        color: textColor,
                        border: isDark ? '1px solid #1e4f72' : '1px solid #c7dff7',
                        borderRadius: '12px',
                        padding: '14px',
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        resize: 'vertical',
                        outline: 'none',
                        boxShadow: 'none',
                        transition: 'border-color 0.2s',
                        fontFamily: "'Poppins', sans-serif",
                    }}
                    onFocus={e => e.target.style.borderColor = '#4f46e5'}
                    onBlur={e => e.target.style.borderColor = isDark ? '#1e4f72' : '#c7dff7'}
                />

                {/* live char badge */}
                <div className="text-end mt-1" style={{ fontSize: '0.8rem', color: isDark ? '#64b5f6' : '#546e7a' }}>
                    {chars} characters · {words} words
                </div>
            </div>

            {/* ── Action Buttons ── */}
            <div className="d-flex flex-wrap gap-2 mb-4">
                {actions.map(({ label, fn, color }) => (
                    <button
                        key={label}
                        disabled={text.length === 0}
                        onClick={fn}
                        style={{
                            background: text.length === 0 ? (isDark ? '#1e3a4a' : '#e2e8f0') : color,
                            color: text.length === 0 ? (isDark ? '#546e7a' : '#94a3b8') : '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            cursor: text.length === 0 ? 'not-allowed' : 'pointer',
                            transition: 'transform 0.15s, opacity 0.15s',
                            opacity: text.length === 0 ? 0.6 : 1,
                            fontFamily: "'Poppins', sans-serif",
                        }}
                        onMouseEnter={e => { if (text.length > 0) e.target.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* ── Stats Cards ── */}
            <div className="row g-3 mb-4">
                {[
                    { icon: '📝', value: words,     label: 'Words' },
                    { icon: '🔤', value: chars,     label: 'Characters' },
                    { icon: '💬', value: sentences, label: 'Sentences' },
                    { icon: '⏱️', value: readTime,  label: 'Min Read' },
                ].map(({ icon, value, label }) => (
                    <div className="col-6 col-md-3" key={label}>
                        <div className="rounded-4 text-center py-3 px-2 h-100" style={{
                            background: statBg,
                            border: cardBorder,
                        }}>
                            <div style={{ fontSize: '1.6rem' }}>{icon}</div>
                            <div style={{
                                fontSize: '1.6rem',
                                fontWeight: 700,
                                color: isDark ? '#90caf9' : '#4f46e5',
                                lineHeight: 1.2
                            }}>{value}</div>
                            <div style={{
                                fontSize: '0.78rem',
                                fontWeight: 500,
                                color: isDark ? '#64b5f6' : '#546e7a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>{label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Preview ── */}
            <div className="rounded-4 p-4 shadow-sm" style={{
                background: cardBg,
                border: cardBorder,
            }}>
                <h5 style={{
                    fontWeight: 700,
                    color: isDark ? '#90caf9' : '#4f46e5',
                    marginBottom: '12px',
                }}>
                    👁️ Preview
                </h5>
                <p style={{
                    color: text.length > 0 ? textColor : (isDark ? '#546e7a' : '#94a3b8'),
                    fontStyle: text.length > 0 ? 'normal' : 'italic',
                    lineHeight: 1.8,
                    margin: 0,
                    minHeight: '48px',
                    fontSize: '1rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                }}>
                    {text.length > 0 ? text : 'Nothing to preview! Start typing above…'}
                </p>
            </div>

        </div>
    );
}
