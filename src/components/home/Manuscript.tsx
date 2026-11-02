export function Manuscript({ sanskrit, translation }: { sanskrit: string; translation: string }) {
  return (
    <section className="ivory-panel py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <p className="text-[0.72rem] tracking-[0.24em] text-gold uppercase">Manuscript</p>
        <div className="mt-8 border border-deep/15 bg-[#fbf7ef] px-6 py-10 shadow-lift sm:px-14 sm:py-16">
          <div className="mx-auto h-px w-24 bg-gold" />
          {sanskrit ? (
            <>
              <p className="devanagari mt-8 text-center text-3xl leading-relaxed text-deep sm:text-4xl">{sanskrit}</p>
              {translation ? <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-deep/75">{translation}</p> : null}
              <p className="mt-8 text-center text-[0.68rem] tracking-[0.16em] text-deep/50 uppercase">Supplied by the consultancy</p>
            </>
          ) : (
            <>
              <p className="mt-8 text-center text-[0.68rem] tracking-[0.2em] text-terracotta uppercase">Awaiting a sourced verse</p>
              <p className="devanagari akshara-live mt-6 text-center text-3xl text-deep/70">वास्तु</p>
              <p className="mx-auto mt-6 max-w-xl text-center font-serif text-3xl leading-snug text-deep italic">
                A verified Sanskrit verse will be set here with its transliteration, English meaning, and source.
              </p>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-deep/65">
                No ancient quotation is displayed until that source is confirmed. The word above is the name of the practice, not a shloka.
              </p>
            </>
          )}
          <div className="mx-auto mt-8 h-px w-24 bg-gold" />
        </div>
      </div>
    </section>
  );
}
