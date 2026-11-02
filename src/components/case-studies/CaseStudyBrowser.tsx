"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/data/public";
import { caseCategories } from "@/lib/site";
import { YantraFrame } from "@/components/animations/YantraFrame";
import { Button } from "@/components/ui/Button";

export function CaseStudyBrowser({ studies }: { studies: CaseStudy[] }) {
  const [category, setCategory] = useState("all");
  const visible = useMemo(
    () => (category === "all" ? studies : studies.filter((study) => study.category === category)),
    [category, studies],
  );

  if (studies.length === 0) {
    return (
      <div className="border border-deep/10 bg-ivory px-6 py-14 sm:px-12">
        <p className="max-w-2xl font-serif text-4xl leading-tight">There are no published case studies yet.</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-deep/70">
          A study is added only after the client has agreed to publication. Demonstration records stay unpublished.
        </p>
        <div className="mt-8">
          <Button href="/approach" variant="line">
            Learn about the consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Case study categories">
        <button type="button" className={`px-3 py-2 text-[0.68rem] tracking-[0.14em] uppercase transition-colors hover:border-gold ${category === "all" ? "bg-deep text-ivory" : "border border-deep/15"}`} onClick={() => setCategory("all")}>
          All
        </button>
        {caseCategories.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`px-3 py-2 text-[0.68rem] tracking-[0.14em] uppercase transition-colors hover:border-gold ${category === item.value ? "bg-deep text-ivory" : "border border-deep/15"}`}
            onClick={() => setCategory(item.value)}
            aria-pressed={category === item.value}
          >
            {item.label}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-8 text-deep/70">No published studies in this category.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {visible.map((study) => (
            <Link key={study.id} href={`/case-studies/${study.slug}`} className="group bg-ivory">
              <div className="relative aspect-[16/10] overflow-hidden bg-deep">
                {study.coverImageUrl ? (
                  <Image src={study.coverImageUrl} alt={study.coverImageAlt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                ) : null}
                <YantraFrame />
              </div>
              <div className="p-6">
                <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">
                  {caseCategories.find((item) => item.value === study.category)?.label}
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight group-hover:text-terracotta">{study.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-deep/70">{study.clientConcern}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
