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
              Professionals spend <span className="text-white font-medium">6+ hours per week</span> asking "do you know anyone who..."
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
                Cold outreach → <span className="text-white/70">1-5% response</span>
              </div>
            </div>
          </div>
          <p className="text-2xl pt-8">
            Warm intros are <span className="text-emerald-400">15x more effective</span>.
            <br />
            <span className="text-white/50">But finding them is painfully slow.</span>
          </p>
        </div>
      </div>

      {/* Slide 3: Why This Matters */}
      <div className="min-h-screen flex items-center justify-center p-16 page-break">
        <div className="max-w-4xl w-full">
          <p className="text-white/40 text-base mb-8">WHY THIS MATTERS</p>
          <div className="grid grid-cols-3 gap-12 mb-10">
            <div className="text-center">
              <div className="text-6xl font-light">1-5%</div>
              <p className="text-white/40 mt-3 text-sm">cold email<br />response rate</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-light text-emerald-400">46%</div>
              <p className="text-white/40 mt-3 text-sm">warm intro<br />response rate</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-light">6hrs</div>
              <p className="text-white/40 mt-3 text-sm">per week<br />prospecting</p>
            </div>
          </div>
          <p className="text-center text-xl text-white/60 mb-10">
            15x more effective, but painfully slow
          </p>
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl font-light">84%</div>
              <p className="text-white/40 mt-3 text-sm">of B2B deals<br />start with referral</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-light">69%</div>
              <p className="text-white/40 mt-3 text-sm">faster close<br />with referrals</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-light text-emerald-400">71%</div>
              <p className="text-white/40 mt-3 text-sm">higher conversion<br />with referrals</p>
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
            [know] turns <span className="text-emerald-400">hours</span> into <span className="text-emerald-400">seconds</span>.
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
              <h3 className="text-emerald-400 text-xl mb-3">Network Effects (Validated)</h3>
              <p className="text-white/60">Metcalfe's Law proven with Tencent/Facebook data. Network value grows n² as users join.</p>
            </div>
            <div>
              <h3 className="text-emerald-400 text-xl mb-3">Data Moat</h3>
              <p className="text-white/60">Proprietary relationship graph. Each user adds ~930 connections to searchable paths.</p>
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
            The first platform to make your entire professional history<br />
            <span className="text-emerald-400">instantly searchable.</span>
          </p>
          <p className="text-center text-xs text-white/20 mt-4">
            Network effects: Zhang et al. 2015 (Metcalfe validation) · Avg professional connections: LinkedIn 2024
          </p>
        </div>
      </div>

      {/* Slide 7: Market */}
      <div className="min-h-screen flex items-center p-16 page-break">
        <div className="max-w-4xl w-full">
          <p className="text-white/40 text-base mb-6">MARKET</p>
          <h1 className="text-6xl font-light mb-10">
            <span className="text-emerald-400">$10B+</span> market by 2032
          </h1>
          <div className="grid grid-cols-2 gap-10 mb-8">
            <div>
              <p className="text-white/40 text-sm mb-4">TARGET MARKET</p>
              <p className="text-lg mb-2">100M knowledge workers in US</p>
              <p className="text-white/50 mb-4">Wedge: 13M+ sales professionals</p>
              <div className="text-sm text-white/40 space-y-1">
                <p>@ $30/month:</p>
                <p>→ Sales wedge = <span className="text-white/70">$4.7B</span></p>
                <p>→ US knowledge workers = <span className="text-white/70">$36B</span></p>
              </div>
            </div>
            <div>
              <p className="text-white/40 text-sm mb-4">MARKET VALIDATION</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>ZoomInfo</span>
                  <span className="text-white/40">$1.21B revenue</span>
                </div>
                <div className="flex justify-between">
                  <span>Apollo.io</span>
                  <span className="text-white/40">$1.6B valuation</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Intel Market</span>
                  <span className="text-white/40">$4.4B → $10B</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg text-white/60">
            They sell contact data. <span className="text-white">We reveal relationships you already have.</span>
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

          <div className="grid grid-cols-2 gap-8 text-sm text-white/60 max-w-sm mx-auto">
            <div>
              <p className="text-white/40 mb-2">Private beta</p>
              <p>50 users testing</p>
            </div>
            <div>
              <p className="text-white/40 mb-2">Public beta</p>
              <p>March 15 launch</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 9: Competition */}
      <div className="min-h-screen flex items-center p-16 page-break">
        <div className="max-w-4xl w-full">
          <p className="text-white/40 text-base mb-6">COMPETITION</p>
          <h1 className="text-3xl font-light mb-6">
            We're not competing. <span className="text-white/40">We're creating.</span>
          </h1>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-4 py-2 border-b border-white/10 text-white/40">
              <span></span>
              <span>THEM</span>
              <span className="text-emerald-400">[KNOW]</span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 border-b border-white/10">
              <span className="text-white/70">LinkedIn Sales Nav</span>
              <span className="text-white/40">Searches their database, not yours</span>
              <span className="text-emerald-400">Searches YOUR relationships</span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 border-b border-white/10">
              <span className="text-white/70">ZoomInfo / Apollo</span>
              <span className="text-white/40">Sells contact data for cold outreach</span>
              <span className="text-emerald-400">Finds warm intro paths instantly</span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 border-b border-white/10">
              <span className="text-white/70">Pally (YC W24)</span>
              <span className="text-white/40">Manual starring & tagging required</span>
              <span className="text-emerald-400">Zero setup, instant results</span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 border-b border-white/10">
              <span className="text-white/70">Happenstance (YC W24)</span>
              <span className="text-white/40">Team-focused, Slack-dependent</span>
              <span className="text-emerald-400">Individual-first, works anywhere</span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 border-b border-white/10">
              <span className="text-white/70">Affinity</span>
              <span className="text-white/40">$500/seat enterprise CRM</span>
              <span className="text-emerald-400">$30/mo consumer product</span>
            </div>
          </div>
          <p className="text-white/60 mt-6 text-center">
            Privacy-first (metadata only). <span className="text-white">Sub-second search. Network effects.</span>
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
                <div><span className="text-white/40">M3:</span> 500 customers, $15K MRR</div>
                <div><span className="text-white/40">M6:</span> 1,500 customers, $45K MRR</div>
                <div><span className="text-white/40">M9:</span> 3,000 customers, $90K MRR</div>
                <div><span className="text-white/40">M12:</span> Series A ready, $1M+ ARR</div>
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

      {/* Slide 12: Path to Profitability */}
      <div className="min-h-screen flex items-center p-12 page-break">
        <div className="max-w-5xl w-full">
          <p className="text-white/40 text-base mb-4">PATH TO PROFITABILITY</p>

          {/* Top: Budget Allocation */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-emerald-400 text-2xl font-medium">$412K</span>
                <span className="text-white/30 text-xs">55%</span>
              </div>
              <p className="text-white/50 text-xs mb-2">ENGINEERING</p>
              <div className="space-y-1 text-xs text-white/40">
                <div className="flex justify-between"><span>2 Engineers</span><span>$325K</span></div>
                <div className="flex justify-between"><span>API Costs</span><span>$30K</span></div>
                <div className="flex justify-between"><span>AWS/Infra</span><span>$22K</span></div>
                <div className="flex justify-between"><span>Dev Tools</span><span>$35K</span></div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-emerald-400 text-2xl font-medium">$188K</span>
                <span className="text-white/30 text-xs">25%</span>
              </div>
              <p className="text-white/50 text-xs mb-2">GROWTH</p>
              <div className="space-y-1 text-xs text-white/40">
                <div className="flex justify-between"><span>Paid Acquisition</span><span>$100K</span></div>
                <div className="flex justify-between"><span>Content & SEO</span><span>$48K</span></div>
                <div className="flex justify-between"><span>Community</span><span>$40K</span></div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-emerald-400 text-2xl font-medium">$150K</span>
                <span className="text-white/30 text-xs">20%</span>
              </div>
              <p className="text-white/50 text-xs mb-2">OPERATIONS</p>
              <div className="space-y-1 text-xs text-white/40">
                <div className="flex justify-between"><span>Founder Salaries</span><span>$90K</span></div>
                <div className="flex justify-between"><span>Legal/Compliance</span><span>$30K</span></div>
                <div className="flex justify-between"><span>Office & Misc</span><span>$30K</span></div>
              </div>
            </div>
          </div>

          {/* Middle: Graph and Network Effects */}
          <div className="grid grid-cols-5 gap-4">
            {/* Breakeven Chart - Takes 3 columns */}
            <div className="col-span-3 bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-xs mb-3">BREAKEVEN TIMELINE</p>
              <svg viewBox="0 0 280 100" className="w-full h-36">
                <defs>
                  <pattern id="gridPrint" width="28" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect x="35" y="10" width="235" height="70" fill="url(#gridPrint)" />
                <line x1="35" y1="10" x2="35" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="35" y1="80" x2="270" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="35" y1="45" x2="270" y2="45" stroke="rgba(239,68,68,0.4)" strokeWidth="1" strokeDasharray="4,4" />
                <text x="272" y="48" fill="rgba(239,68,68,0.6)" fontSize="7">$50K burn</text>
                <path d="M35 78 C60 76, 80 72, 100 65 S140 50, 160 45 S200 30, 230 20 L270 10" fill="none" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="160" cy="45" r="6" fill="#10b981" />
                <circle cx="160" cy="45" r="10" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4" />
                <circle cx="67" cy="76" r="2" fill="#10b981" opacity="0.6" />
                <circle cx="100" cy="65" r="2" fill="#10b981" opacity="0.6" />
                <circle cx="130" cy="52" r="2" fill="#10b981" opacity="0.6" />
                <circle cx="200" cy="30" r="2" fill="#10b981" opacity="0.6" />
                <circle cx="235" cy="18" r="2" fill="#10b981" opacity="0.6" />
                <text x="8" y="48" fill="rgba(255,255,255,0.4)" fontSize="7">$50K</text>
                <text x="8" y="83" fill="rgba(255,255,255,0.4)" fontSize="7">$0</text>
                <text x="8" y="18" fill="rgba(255,255,255,0.4)" fontSize="7">$100K</text>
                <text x="35" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M0</text>
                <text x="100" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M5</text>
                <text x="160" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M8</text>
                <text x="230" y="92" fill="rgba(255,255,255,0.3)" fontSize="7">M15</text>
                <text x="160" y="38" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">BREAKEVEN</text>
                <text x="160" y="60" fill="rgba(255,255,255,0.5)" fontSize="6" textAnchor="middle">1,667 customers</text>
              </svg>
              <div className="flex justify-between items-center mt-2 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5 bg-emerald-400"></div>
                    <span className="text-white/40">MRR @ $30/user</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5 bg-red-400/60"></div>
                    <span className="text-white/40">$50K/mo burn</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-medium">Target: Month 8</span>
              </div>
            </div>

            {/* Network Effects - Takes 2 columns */}
            <div className="col-span-2 bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-xs mb-1">NETWORK COVERAGE PROOF</p>
              <p className="text-white/30 text-[10px] mb-3">Graph theory: avg 930 LinkedIn connections per user</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-xs w-12">1K</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400/70 rounded-full" style={{ width: "73%" }} />
                  </div>
                  <span className="text-white/50 text-xs w-24 text-right">73% find warm path</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-xs w-12">10K</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400/80 rounded-full" style={{ width: "94%" }} />
                  </div>
                  <span className="text-white/50 text-xs w-24 text-right">94% find warm path</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-xs w-12">50K</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: "99%" }} />
                  </div>
                  <span className="text-emerald-400 text-xs font-medium w-24 text-right">99%+ warm paths</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-white/30">
                <p>2nd-degree reach: users × 930 × overlap factor</p>
                <p className="mt-1">At 10K users → <span className="text-white/50">9.3M reachable people</span></p>
              </div>
            </div>
          </div>

          {/* Bottom: Future Capabilities */}
          <div className="mt-4 bg-gradient-to-r from-emerald-400/5 via-emerald-400/10 to-transparent rounded-lg p-4">
            <p className="text-emerald-400 text-xs mb-2">FUTURE PRODUCT EXPANSION</p>
            <div className="grid grid-cols-3 gap-6 text-xs">
              <div>
                <p className="text-white/70 font-medium">Teams & Enterprise</p>
                <p className="text-white/40">Pooled network search across orgs → 10x reach per seat</p>
              </div>
              <div>
                <p className="text-white/70 font-medium">Intro Success Scoring</p>
                <p className="text-white/40">ML model predicts which paths convert based on relationship signals</p>
              </div>
              <div>
                <p className="text-white/70 font-medium">Proactive Recommendations</p>
                <p className="text-white/40">"You should connect with X" - AI surfaces opportunities before you search</p>
              </div>
            </div>
          </div>

          <p className="text-[9px] text-white/20 mt-3 text-center">
            Network coverage: Erdős-Rényi model, Backstrom et al. 2012 · Avg connections: LinkedIn 2024 · Salaries: Levels.fyi 2024
          </p>
        </div>
      </div>

      {/* Slide 13: Future Outlook */}
      <div className="min-h-screen flex items-center p-12 page-break">
        <div className="max-w-5xl w-full">
          <p className="text-white/40 text-base mb-2">FUTURE OUTLOOK</p>
          <p className="text-white/60 text-sm mb-6">What happens as we scale — backed by network science</p>

          <div className="space-y-4">
            {/* 1K Users */}
            <div className="bg-gradient-to-r from-emerald-400/20 to-emerald-400/5 rounded-lg p-4 border border-emerald-400/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-light text-white">1,000</span>
                  <span className="text-white/40 text-sm">users</span>
                </div>
                <span className="text-emerald-400 text-sm font-medium">Month 3</span>
              </div>
              <div className="grid grid-cols-3 gap-6 text-xs">
                <div>
                  <p className="text-white/40 mb-1">FINANCIAL</p>
                  <p className="text-white/70">MRR: <span className="text-white">$15K</span> · ARR: <span className="text-white">$180K</span> · Est. Val: <span className="text-emerald-400">~$2M</span></p>
                </div>
                <div>
                  <p className="text-white/40 mb-1">NETWORK EFFECT</p>
                  <p className="text-white/70">2° Reach: <span className="text-white">930K people</span> · Match Rate: <span className="text-white">73%</span></p>
                </div>
                <div>
                  <p className="text-white/40 mb-1">UNLOCKS</p>
                  <p className="text-white/70">PMF validation · First enterprise pilots · Referral loop activated</p>
                </div>
              </div>
            </div>

            {/* 10K Users */}
            <div className="bg-gradient-to-r from-emerald-400/40 to-emerald-400/10 rounded-lg p-4 border border-emerald-400/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-light text-white">10,000</span>
                  <span className="text-white/40 text-sm">users</span>
                </div>
                <span className="text-emerald-400 text-sm font-medium">Month 9</span>
              </div>
              <div className="grid grid-cols-3 gap-6 text-xs">
                <div>
                  <p className="text-white/40 mb-1">FINANCIAL</p>
                  <p className="text-white/70">MRR: <span className="text-white">$90K</span> · ARR: <span className="text-white">$1.08M</span> · Est. Val: <span className="text-emerald-400">~$10M</span></p>
                </div>
                <div>
                  <p className="text-white/40 mb-1">NETWORK EFFECT</p>
                  <p className="text-white/70">2° Reach: <span className="text-white">9.3M people</span> · Match Rate: <span className="text-white">94%</span></p>
                </div>
                <div>
                  <p className="text-white/40 mb-1">UNLOCKS</p>
                  <p className="text-white/70">Giant component formed · Series A ready · Team features launch</p>
                </div>
              </div>
            </div>

            {/* 50K Users */}
            <div className="bg-gradient-to-r from-emerald-400/60 to-emerald-400/20 rounded-lg p-4 border border-emerald-400/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-light text-white">50,000</span>
                  <span className="text-white/40 text-sm">users</span>
                </div>
                <span className="text-emerald-400 text-sm font-medium">Month 18</span>
              </div>
              <div className="grid grid-cols-3 gap-6 text-xs">
                <div>
                  <p className="text-white/40 mb-1">FINANCIAL</p>
                  <p className="text-white/70">MRR: <span className="text-white">$450K</span> · ARR: <span className="text-white">$5.4M</span> · Est. Val: <span className="text-emerald-400">~$50M</span></p>
                </div>
                <div>
                  <p className="text-white/40 mb-1">NETWORK EFFECT</p>
                  <p className="text-white/70">2° Reach: <span className="text-white">46.5M people</span> · Match Rate: <span className="text-white">99%+</span></p>
                </div>
                <div>
                  <p className="text-white/40 mb-1">UNLOCKS</p>
                  <p className="text-white/70">Near-universal coverage · Enterprise dominant · Platform ecosystem</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-white/50">
              Network value grows <span className="text-emerald-400">n²</span> (Metcalfe's Law) — validated by Tencent/Facebook data
            </p>
            <p className="text-[9px] text-white/30 mt-1">
              Zhang et al. 2015 · Giant component threshold: Erdős-Rényi · Avg 930 connections/user: LinkedIn 2024
            </p>
          </div>
        </div>
      </div>

      {/* Slide 14: Close */}
      <div className="min-h-screen flex items-center justify-center p-16 page-break">
        <div className="text-center">
          <div className="text-5xl font-light leading-tight mb-12">
            The path to anyone<br />
            <span className="text-white/30">shouldn't be cold.</span>
          </div>
          <div className="text-6xl font-mono mb-4">[know]</div>
          <p className="text-white/40 mb-8">useknow.io</p>
          <div className="flex justify-center gap-16 mb-4">
            <div>
              <p className="text-white">Satyam Dave</p>
              <p className="text-white/40 text-sm">CEO & Co-founder</p>
              <p className="text-blue-400 text-xs">linkedin.com/in/satyamvdave</p>
            </div>
            <div>
              <p className="text-white">Udaya Vijay Anand</p>
              <p className="text-white/40 text-sm">CTO & Co-founder</p>
              <p className="text-blue-400 text-xs">linkedin.com/in/udaya-vijay-anand</p>
            </div>
          </div>
          <p className="text-emerald-400 text-lg">founders@useknow.io</p>
          <p className="text-blue-400 text-xs mt-2">linkedin.com/company/useknow</p>
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
