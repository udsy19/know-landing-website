// Print-friendly version of the pitch deck for PDF export
// Access at /pitch/print and use Cmd+P (Mac) or Ctrl+P (Windows) to save as PDF

export default function PitchDeckPrint() {
  return (
    <div className="bg-black text-white">
      {/* Slide 1: Title */}
      <div className="min-h-screen flex items-center justify-center p-12 page-break">
        <div className="text-center">
          <div className="text-9xl font-mono tracking-tighter">[know]</div>
          <p className="text-3xl text-white/60 mt-8">
            Your Network, Searchable.
          </p>
        </div>
      </div>

      {/* Slide 2: Problem */}
      <div className="min-h-screen flex items-center p-16 page-break">
        <div className="max-w-4xl">
          <p className="text-white/40 text-base mb-4">THE PROBLEM</p>
          <h1 className="text-5xl font-light leading-tight mb-8">
            Finding warm introductions is broken.
          </h1>
          <div className="space-y-4 text-xl text-white/70">
            <p>
              Professionals spend <span className="text-white font-medium">10+ hours per week</span> asking "do you know anyone who..."
            </p>
            <div className="grid grid-cols-2 gap-4 pt-6 text-base">
              <div className="text-white/50">
                LinkedIn search → <span className="text-white/70">Hours</span>
              </div>
              <div className="text-white/50">
                Old emails → <span className="text-white/70">Days</span>
              </div>
              <div className="text-white/50">
                Friend intros → <span className="text-white/70">Weeks</span>
              </div>
              <div className="text-white/50">
                Cold outreach → <span className="text-white/70">2% response</span>
              </div>
            </div>
          </div>
          <p className="text-2xl pt-8">
            Warm intros close <span className="text-emerald-400">34x more deals</span>.
            <br />
            <span className="text-white/50">But finding them is still manual in 2026.</span>
          </p>
        </div>
      </div>

      {/* Slide 3: Why This Matters */}
      <div className="min-h-screen flex items-center justify-center p-16 page-break">
        <div className="max-w-4xl w-full">
          <p className="text-white/40 text-base mb-8">WHY THIS MATTERS</p>
          <div className="grid grid-cols-3 gap-12 mb-10">
            <div className="text-center">
              <div className="text-6xl font-light">2%</div>
              <p className="text-white/40 mt-3 text-sm">cold email<br />response rate</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-light text-emerald-400">68%</div>
              <p className="text-white/40 mt-3 text-sm">warm intro<br />response rate</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-light">10hrs</div>
              <p className="text-white/40 mt-3 text-sm">per week<br />wasted</p>
            </div>
          </div>
          <p className="text-center text-xl text-white/60 mb-10">
            34x more effective, but manual
          </p>
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl font-light">91%</div>
              <p className="text-white/40 mt-3 text-sm">of cold emails<br />ignored</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-light">3 wks</div>
              <p className="text-white/40 mt-3 text-sm">to find one<br />warm path</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-light text-red-400">$47B</div>
              <p className="text-white/40 mt-3 text-sm">wasted on<br />cold outreach</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 4: Insight */}
      <div className="min-h-screen flex items-center p-16 page-break">
        <div className="max-w-4xl">
          <p className="text-emerald-400 text-base mb-8">THE INSIGHT</p>
          <h1 className="text-4xl font-light leading-tight mb-12">
            The average professional has:
          </h1>
          <div className="space-y-8">
            <div className="flex items-baseline gap-6">
              <span className="text-6xl font-light">50,000+</span>
              <span className="text-white/50 text-2xl">emails</span>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="text-6xl font-light">2,500+</span>
              <span className="text-white/50 text-2xl">connections</span>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="text-6xl font-light">10 years</span>
              <span className="text-white/50 text-2xl">of relationship data</span>
            </div>
          </div>
          <div className="mt-14 space-y-3">
            <p className="text-white/50 text-2xl">All sitting in your inbox.</p>
            <p className="text-white/50 text-2xl">Completely unsearchable.</p>
            <p className="text-emerald-400 text-3xl mt-6">We make it searchable.</p>
          </div>
        </div>
      </div>

      {/* Slide 5: Solution */}
      <div className="min-h-screen flex items-center p-16 page-break">
        <div className="max-w-4xl w-full">
          <p className="text-white/40 text-base mb-6">THE SOLUTION</p>
          <h1 className="text-4xl font-light mb-10">
            [know] turns <span className="text-emerald-400">10 hours</span> into <span className="text-emerald-400">10 seconds</span>.
          </h1>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <p className="text-white/50 text-sm">Search:</p>
            <p className="text-xl">"VCs investing in AI robotics"</p>
            <p className="text-emerald-400 mt-2">→ 12 results in 0.8 seconds</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-lg p-5">
              <p className="text-emerald-400 font-medium mb-4">CONNECT</p>
              <div className="text-white/70 space-y-2">
                <p>Gmail</p>
                <p>Calendar</p>
                <p>LinkedIn</p>
              </div>
              <p className="text-white/40 text-sm mt-4">2 minutes, one time</p>
            </div>
            <div className="bg-white/5 rounded-lg p-5">
              <p className="text-emerald-400 font-medium mb-4">SEARCH</p>
              <div className="text-white/70 space-y-2">
                <p>Any role,</p>
                <p>company,</p>
                <p>criteria</p>
              </div>
              <p className="text-white/40 text-sm mt-4">0.8 seconds per search</p>
            </div>
            <div className="bg-white/5 rounded-lg p-5">
              <p className="text-emerald-400 font-medium mb-4">GET INTRO</p>
              <div className="text-white/70 space-y-2">
                <p>Sarah Chen</p>
                <p>You → Sarah</p>
                <p>Score: 0.92</p>
              </div>
              <p className="text-white/40 text-sm mt-4">One click, 85% response</p>
            </div>
          </div>

          <p className="text-center text-white/50 mt-8 text-lg">
            From hours of searching to seconds of results.
          </p>
        </div>
      </div>

      {/* Slide 6: Moat */}
      <div className="min-h-screen flex items-center p-16 page-break">
        <div className="max-w-4xl w-full">
          <p className="text-white/40 text-base mb-8">THE MOAT</p>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h3 className="text-emerald-400 text-xl mb-3">Network Effects</h3>
              <p className="text-white/60">More users = better connection paths discovered</p>
            </div>
            <div>
              <h3 className="text-emerald-400 text-xl mb-3">Data Moat</h3>
              <p className="text-white/60">Proprietary relationship graph gets smarter daily</p>
            </div>
            <div>
              <h3 className="text-emerald-400 text-xl mb-3">Privacy-First</h3>
              <p className="text-white/60">Never read email content. Metadata only. Can't be replicated.</p>
            </div>
            <div>
              <h3 className="text-emerald-400 text-xl mb-3">Switching Costs</h3>
              <p className="text-white/60">Teams rely on it. Their network = locked in.</p>
            </div>
          </div>
          <p className="text-center text-2xl mt-14">
            Tech is hard. <span className="text-white/50">We figured it out.</span>
          </p>
        </div>
      </div>

      {/* Slide 7: Market */}
      <div className="min-h-screen flex items-center p-16 page-break">
        <div className="max-w-4xl w-full">
          <p className="text-white/40 text-base mb-6">MARKET</p>
          <h1 className="text-6xl font-light mb-10">
            <span className="text-emerald-400">$117B</span> global opportunity
          </h1>
          <div className="grid grid-cols-2 gap-10 mb-8">
            <div>
              <p className="text-white/40 text-sm mb-4">TARGET MARKET</p>
              <p className="text-lg mb-2">200M knowledge workers globally</p>
              <p className="text-white/50 mb-4">Wedge: 10M sales reps + recruiters in US</p>
              <div className="text-sm text-white/40 space-y-1">
                <p>@ $49/month:</p>
                <p>→ Wedge (10M) = <span className="text-white/70">$5.9B</span></p>
                <p>→ Full market (200M) = <span className="text-white/70">$117B</span></p>
              </div>
            </div>
            <div>
              <p className="text-white/40 text-sm mb-4">MARKET VALIDATION</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>ZoomInfo</span>
                  <span className="text-white/40">$1.2B revenue</span>
                </div>
                <div className="flex justify-between">
                  <span>LinkedIn Sales Nav</span>
                  <span className="text-white/40">$1.5B revenue</span>
                </div>
                <div className="flex justify-between">
                  <span>Apollo.io</span>
                  <span className="text-white/40">$1.6B valuation</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg text-white/60">
            They sell contact data. <span className="text-white">We reveal relationships you already have.</span>
            <br />
            <span className="text-emerald-400">Bigger market. Better product.</span>
          </p>
        </div>
      </div>

      {/* Slide 8: Traction */}
      <div className="min-h-screen flex items-center justify-center p-16 page-break">
        <div className="text-center max-w-4xl">
          <p className="text-white/40 text-base mb-8">TRACTION</p>
          <div className="text-8xl font-light mb-3">2,847</div>
          <p className="text-xl text-white/60 mb-2">waitlist signups in 21 days</p>
          <p className="text-emerald-400 mb-10">$0 marketing spend · 100% organic</p>

          <div className="grid grid-cols-3 gap-8 mb-8 max-w-lg mx-auto">
            <div>
              <p className="text-white/40">Week 1</p>
              <p className="text-xl">427</p>
            </div>
            <div>
              <p className="text-white/40">Week 2</p>
              <p className="text-xl">891 <span className="text-emerald-400 text-xs">+108%</span></p>
            </div>
            <div>
              <p className="text-white/40">Week 3</p>
              <p className="text-xl">1,529 <span className="text-emerald-400 text-xs">+72%</span></p>
            </div>
          </div>

          <p className="text-white/50 mb-6">Average growth: <span className="text-white">95% week-over-week</span></p>

          <div className="grid grid-cols-3 gap-8 text-sm text-white/60 max-w-xl mx-auto">
            <div>
              <p className="text-white/40 mb-2">Private beta</p>
              <p>50 users testing</p>
            </div>
            <div>
              <p className="text-white/40 mb-2">Public beta</p>
              <p>March 15 launch</p>
            </div>
            <div>
              <p className="text-white/40 mb-2">Pipeline</p>
              <p className="text-emerald-400">$145K ARR</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 9: Competition */}
      <div className="min-h-screen flex items-center p-16 page-break">
        <div className="max-w-4xl w-full">
          <p className="text-white/40 text-base mb-6">COMPETITION</p>
          <h1 className="text-3xl font-light mb-8">
            We're not competing. <span className="text-white/40">We're creating.</span>
          </h1>
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-3 gap-4 py-3 border-b border-white/10 text-white/40">
              <span></span>
              <span>THEM</span>
              <span className="text-emerald-400">[KNOW]</span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-3 border-b border-white/10">
              <span className="text-white/70">LinkedIn Sales Nav</span>
              <span className="text-white/40">Searches their 1B user database</span>
              <span className="text-emerald-400">Searches YOUR relationships</span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-3 border-b border-white/10">
              <span className="text-white/70">ZoomInfo / Apollo</span>
              <span className="text-white/40">Sells contact data for strangers</span>
              <span className="text-emerald-400">Finds warm intro paths instantly</span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-3 border-b border-white/10">
              <span className="text-white/70">Affinity</span>
              <span className="text-white/40">$500/seat enterprise CRM</span>
              <span className="text-emerald-400">$49/mo consumer product</span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-3 border-b border-white/10">
              <span className="text-white/70">Pally/Clay</span>
              <span className="text-white/40">Tracks relationships manually</span>
              <span className="text-emerald-400">AI-powered, 0.8s results</span>
            </div>
          </div>
          <p className="text-white/60 mt-8 text-center">
            They sell data about strangers. <span className="text-white">We reveal relationships you already have.</span>
          </p>
        </div>
      </div>

      {/* Slide 10: Team */}
      <div className="min-h-screen flex items-center p-16 page-break">
        <div className="max-w-4xl w-full">
          <p className="text-white/40 text-base mb-8">TEAM</p>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <div className="text-3xl mb-3">Satyam Dave</div>
              <p className="text-emerald-400 mb-4">CEO & Co-founder</p>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Ex-Microsoft · AI Product Manager</li>
                <li>Ex-Verkada · Solutions Engineer</li>
                <li>YC startup newsletter · 550+ subscribers</li>
                <li>Purdue University '26</li>
              </ul>
            </div>
            <div>
              <div className="text-3xl mb-3">Udaya Vijay Anand</div>
              <p className="text-emerald-400 mb-4">CTO & Co-founder</p>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Ex-KPMG · Cyber Defense Engineer</li>
                <li>Ex-DBS Bank · Security Automation</li>
                <li>Built AI safety guardrails for enterprise</li>
                <li>Purdue University '26</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-white/40 mt-10 text-sm">
            Technical founders who've built at scale. Now building the future of networking.
          </p>
        </div>
      </div>

      {/* Slide 11: Ask */}
      <div className="min-h-screen flex items-center p-16 page-break">
        <div className="max-w-4xl w-full">
          <p className="text-white/40 text-base mb-6">THE ASK</p>
          <div className="text-center mb-10">
            <div className="text-6xl font-light text-emerald-400">$750K</div>
            <p className="text-xl text-white/40 mt-2">Pre-Seed at $5M post-money</p>
          </div>
          <div className="grid grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-white/40 mb-4">USE OF FUNDS</p>
              <div className="space-y-2 text-white/70">
                <div className="flex justify-between"><span>Engineering</span><span>55%</span></div>
                <div className="flex justify-between"><span>Growth</span><span>25%</span></div>
                <div className="flex justify-between"><span>Operations</span><span>20%</span></div>
              </div>
              <p className="text-white/40 mt-4 text-xs">15-month runway</p>
            </div>
            <div>
              <p className="text-white/40 mb-4">MILESTONES</p>
              <div className="space-y-2 text-white/70">
                <div><span className="text-white/40">M3:</span> 500 customers, $25K MRR</div>
                <div><span className="text-white/40">M6:</span> 1,500 customers, $75K MRR</div>
                <div><span className="text-white/40">M9:</span> 3,000 customers, $150K MRR</div>
                <div><span className="text-white/40">M12:</span> Series A ready, $1M ARR</div>
              </div>
            </div>
            <div>
              <p className="text-white/40 mb-4">WHY NOW</p>
              <div className="space-y-2 text-white/70">
                <p>2,847 signups in 3 weeks, $0 spent</p>
                <p>AI makes this possible now</p>
                <p>Cold outreach is dying</p>
                <p className="text-emerald-400">First mover wins</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 12: Close */}
      <div className="min-h-screen flex items-center justify-center p-16 page-break">
        <div className="text-center">
          <div className="text-5xl font-light leading-tight mb-14">
            The path to anyone<br />
            <span className="text-white/30">shouldn't be cold.</span>
          </div>
          <div className="text-6xl font-mono mb-6">[know]</div>
          <p className="text-white/40 mb-10">useknow.io</p>
          <div className="flex justify-center gap-16">
            <div>
              <p className="text-white">Satyam Dave</p>
              <p className="text-white/40">CEO & Co-founder</p>
            </div>
            <div>
              <p className="text-white">Udaya Vijay Anand</p>
              <p className="text-white/40">CTO & Co-founder</p>
            </div>
          </div>
          <p className="text-emerald-400 mt-8 text-lg">founders@useknow.io</p>
        </div>
      </div>

      <style>{`
        @media print {
          .page-break {
            page-break-after: always;
            page-break-inside: avoid;
          }
          @page {
            size: landscape;
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
