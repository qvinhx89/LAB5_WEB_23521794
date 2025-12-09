# LAB5_WEB_23521794 — React Advanced Lab (Vite)

Implements all exercises from **Lab 5: React Advanced — Practical Exercises**: complex state with `useReducer`, Redux Toolkit cart, performance tuning (`useMemo`, `React.memo`, `useCallback`), route-based code splitting, compound components, portals, and Jest + React Testing Library coverage.

## Running

- `npm install`
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run test` — Jest + RTL test suite

## Feature Map

- `src/components/UserProfile.jsx` — FSM-style `useReducer` fetcher with race-condition guard.
- `src/features/cart/cartSlice.js` — Redux Toolkit cart + memoized `selectCartTax`; store wired in `src/store/store.js`.
- `src/components/performance/LargeList.jsx` — memoized sorting + `React.memo` rows; `useCallback` handlers.
- `src/pages/AdminPanel.jsx` — lazy loaded with `React.lazy` + `<Suspense>` fallback (`LoadingSpinner`).
- `src/components/tabs/Tabs.jsx` — compound Tabs with context + keyboard a11y.
- `src/components/modal/Modal.jsx` — portal-based modal; click bubbling proven via parent handler in `Home`.
- `src/components/LoginForm.jsx` + `src/api/auth.js` — integration-tested login flow.
- `src/components/ErrorBoundary.jsx` — fallback rendering when children throw.

## Tests

- `src/features/cart/cartSlice.test.js` — reducers + memoized selector recomputation checks.
- `src/components/__tests__/userProfileReducer.test.js` — FSM transition coverage.
- `src/components/__tests__/LoginForm.test.jsx` — RTL integration, API mocked.
- `src/components/__tests__/ErrorBoundary.test.jsx` — crash handling + silenced console errors.

## Profiler hướng dẫn (Laggy List)

1) Chạy `npm run dev` và mở React DevTools Profiler.
2) Đứng trên trang Dashboard, bấm **Record**.
3) Bấm **Toggle theme** vài lần để tạo tương tác (không xóa item).
4) Dừng record, so sánh render count/time cho `ListItem` trước/sau tối ưu. Kỳ vọng: số render của từng `ListItem` ≈ 0 khi chỉ đổi theme (nhờ `React.memo` + `useCallback`).
5) Nếu cần thêm số liệu, bật “Flamegraph” và chụp hình/ghi chú thời gian render để đính kèm báo cáo.

### Nếu không thấy nút Record trong Profiler

- Đảm bảo đang ở tab **Profiler** (không phải Components) của React DevTools.
- App phải chạy ở chế độ dev (`npm run dev`), load lại trang sau khi mở DevTools.
- Với React DevTools phiên bản mới, nút là chấm đỏ **● Start profiling** ở góc trái panel Profiler. Nhấn để bắt đầu, nhấn **Stop profiling** để dừng.
- Nếu tab Profiler không xuất hiện: cập nhật extension React Developer Tools (Chrome/Edge store), đóng/mở lại DevTools rồi reload trang.

## Acceptance Checklist

- [x] UserProfile uses `useReducer` with guarded transitions and fetch dispatch flow.
- [x] Redux Toolkit cart with add/remove/clear + memoized tax selector.
- [x] Large list optimized via `useMemo`, `React.memo`, `useCallback`.
- [x] Admin route lazy-loaded with Suspense fallback.
- [x] Compound Tabs + portal Modal implemented with a11y basics.
- [x] Login form + ErrorBoundary tested with Jest + RTL.

### Profiler note
Use React DevTools Profiler before/after toggling theme in `LargeList` to record render timings and confirm row renders are minimized.
