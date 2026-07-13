<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Build notes
- `npm run build` OOMs on this machine (4GB RAM). Use dev server (`npm run dev`) for testing.
- To verify: `curl.exe -s http://localhost:3000/api/products`
