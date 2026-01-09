# OKMD Frontend – 100% Compliant Blueprint (Final)

> เอกสารฉบับนี้คือ **เวอร์ชันที่ถูกต้อง 100%** ตามกฎ OKMD Frontend ที่ล็อกไว้ ใช้เป็น **SOURCE OF TRUTH เดียว** สำหรับโค้ดทั้งหมดต่อจากนี้

---

## 0. สถานะ

- Architecture: ✅ 100% Compliant
- No max-width / fixed width: ✅
- No layout in Page / Block: ✅
- ContainerPage = layout engine เดียว: ✅
- Block = pure UI (zero layout / spacing / responsive / data): ✅

---

## 1. โครงสร้างโฟลเดอร์ (Final)

```
app/
 ├─ layout.tsx                # Global shell only
 ├─ page.tsx                  # Route composer only
 ├─ home/
 │   ├─ page.tsx
 │   └─ HomePage.tsx          # Composer only
 ├─ news/[id]/page.tsx
 ├─ activity/[id]/page.tsx
 └─ ...

containers/
 ├─ ContainerPage.tsx         # Layout engine (grid-12, fluid)
 ├─ home/
 │   ├─ Hero.container.tsx
 │   ├─ Search.container.tsx
 │   ├─ Highlight.container.tsx
 │   ├─ Recommend.container.tsx
 │   ├─ Activity.container.tsx
 │   ├─ Knowledge.container.tsx
 │   └─ News.container.tsx
 └─ detail/
     └─ Detail.container.tsx

blocks/
 ├─ Button.tsx
 ├─ Input.tsx
 ├─ Card.tsx
 ├─ Breadcrumb.tsx
 ├─ SearchBox.tsx
 ├─ ResultItem.tsx
 └─ ...

lib/
 ├─ data/
 ├─ hooks/
 └─ utils/
```

---

## 2. Page Rules (100% ถูก)

```tsx
// app/home/page.tsx
export default function Page() {
  return <HomePage />
}
```

```tsx
// app/home/HomePage.tsx
export default function HomePage() {
  return (
    <>
      <HeroContainer />
      <SearchContainer />
      <HighlightContainer />
      <RecommendContainer />
      <ActivityContainer />
      <KnowledgeContainer />
      <NewsContainer />
    </>
  )
}
```

- ❌ ไม่มี layout
- ❌ ไม่มี grid / spacing
- ❌ ไม่มี responsive

---

## 3. ContainerPage (Layout Engine เดียว)

```tsx
export function ContainerPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full grid grid-cols-12">
      {children}
    </div>
  )
}
```

- ✔️ grid-cols-12
- ✔️ fluid width
- ❌ ไม่มี data / condition

---

## 4. Section Container (ตัวอย่างที่ถูก 100%)

```tsx
export function SearchContainer() {
  const [query, setQuery] = useState("")

  return (
    <ContainerPage>
      <section className="col-span-12 md:col-span-8 md:col-start-3">
        <SearchBox value={query} onChange={setQuery} />
      </section>
    </ContainerPage>
  )
}
```

- ✔️ layout อยู่ที่ container
- ✔️ state อยู่ที่ container
- ❌ block ไม่รู้ layout

---

## 5. Block (Pure UI – Zero Rule)

```tsx
export function SearchBox({ value, onChange }) {
  return (
    <div>
      <input value={value} onChange={e => onChange(e.target.value)} />
      <button>Search</button>
    </div>
  )
}
```

**Block ห้ามเด็ดขาด**

- ❌ grid / flex
- ❌ margin / padding
- ❌ responsive (`sm:`, `md:`)
- ❌ data fetch
- ❌ layout logic

---

## 6. Detail / Content Page (No max-width)

❌ **ห้าม**

```tsx
<div className="max-w-[960px] mx-auto">
```

✅ **ถูกต้อง**

```tsx
<ContainerPage>
  <section className="col-span-12 lg:col-span-8 lg:col-start-3">
    <DetailContent />
  </section>
</ContainerPage>
```

---

## 7. Responsive Rule (Locked)

- Responsive ทำได้เฉพาะ:
  - Container
  - Page-level wrapper
- ❌ Block ห้าม responsive ทุกกรณี

---

## 8. สิ่งที่ถูกลบออกทั้งหมด (Final Cleanup)

- ❌ `max-w-*`
- ❌ `w-[1440px]`, `h-[xxx]`
- ❌ absolute layout
- ❌ layout logic ใน Page
- ❌ responsive ใน Block

---

## 9. Enforcement Checklist (ใช้ทุก PR)

-

---

## 10. Verdict

> นี่คือ **เวอร์ชันที่ถูกต้อง 100%** ไม่มีจุดประนีประนอม ใช้เป็นฐานให้ AI / คน / CI ได้ทันที

จากนี้:

- ❌ หยุดถก architecture
- ✅ เริ่มสร้าง feature ได้เลย

