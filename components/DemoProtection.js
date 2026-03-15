'use client';
import { useEffect } from 'react';

export default function DemoProtection() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable common keyboard shortcuts for dev tools / view source / save
    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12') { e.preventDefault(); return false; }
      // Ctrl/Cmd + U (view source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') { e.preventDefault(); return false; }
      // Ctrl/Cmd + S (save page)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); return false; }
      // Ctrl/Cmd + Shift + I (dev tools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') { e.preventDefault(); return false; }
      // Ctrl/Cmd + Shift + J (console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') { e.preventDefault(); return false; }
      // Ctrl/Cmd + Shift + C (inspect element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') { e.preventDefault(); return false; }
      // Ctrl/Cmd + A (select all)
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') { e.preventDefault(); return false; }
      // Ctrl/Cmd + C (copy) on the page level
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        // Allow copy inside input/textarea
        const tag = e.target.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          return false;
        }
      }
    };

    // Disable drag on images
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // Detect dev tools open (console size trick — not foolproof)
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      if (widthThreshold || heightThreshold) {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:-apple-system,sans-serif;text-align:center;padding:40px;background:#f2f2f7;"><div><h1 style="font-size:24px;margin-bottom:8px;">Demo Access Only</h1><p style="color:#8e8e93;">Please close developer tools to continue viewing the demo.</p></div></div>';
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    // Check periodically for dev tools
    const devToolsInterval = setInterval(detectDevTools, 2000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      clearInterval(devToolsInterval);
    };
  }, []);

  return null;
}
