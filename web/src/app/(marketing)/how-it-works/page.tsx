'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Search, Users, TrendingUp, Shield, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  
  const howItWorksSteps = [
    {
      step: 1,
      title: 'Create Your Profile',
      description: 'Sign up with your email and create a profile. Tell the community what you offer and what you\'re seeking. Verify your identity to build trust.',
      icon: Users,
      bulletPoints: ['Free account creation', 'Optional identity verification', 'Build your reputation score'],
    },
    {
      step: 2,
      title: 'Find Matches',
      description: 'Browse the marketplace or let our smart algorithm find users who want what you offer and offer what you want. Save searches for automatic alerts.',
      icon: Search,
      bulletPoints: ['AI-powered matching', 'Advanced search filters', 'Location-based results'],
    },
    {
      step: 3,
      title: 'Negotiate & Agree',
      description: 'Chat with potential trade partners through our secure messaging system. Agree on terms, timelines, and create a trade contract.',
      icon: MessageSquare,
      bulletPoints: ['In-app messaging', 'Digital trade contracts', 'Escrow protection'],
    },
    {
      step: 4,
      title: 'Complete & Review',
      description: 'Complete the trade, confirm delivery, and leave a review. Build your reputation and earn credits for future trades.',
      icon: CircleCheck,
      bulletPoints: ['Mutual confirmation required', 'Rating and review system', 'Dispute resolution support'],
    }
  ]

  // const creditSystems = [
  //   {
  //     title: 'Earn',
  //     description: 'Provide goods or services to others and earn credits based on the agreed value',
  //   },
  //   {
  //     title: 'Spend',
  //     description: 'Use your credits to obtain goods or services from any user on the platform',
  //   },
  //   {
  //     title: 'Grow',
  //     description: 'Build your credit balance and unlock more trading opportunities',
  //   }
  // ]

  const safetyFeatures = [
    {
      icon: Shield,
      title: 'Verified Users',
      description: 'Identity verification through email, phone, and optional ID upload. Verified badges help you identify trustworthy users.',
      iconColor: '#388C68',
      hoverBorder: '#AEF0D3',
    },
    {
      icon: CircleCheck,
      title: 'Rating System',
      description: "Every completed trade can be rated and reviewed. Build your reputation score and see others' track records before trading.",
      iconColor: '#1E17ED',
      hoverBorder: '#caf0f8',
    },
    {
      icon: Shield,
      title: 'Escrow Protection',
      description: 'Items and credits are held in escrow until both parties confirm completion, ensuring fairness and security.',
      iconColor: '#8924E7',
      hoverBorder: '#c8b6ff',
    },
    {
      icon: MessageSquare,
      title: 'Dispute Resolution',
      description: 'If issues arise, our dispute resolution team mediates to find fair solutions based on trade contracts and evidence.',
      iconColor: '#5110EA',
      hoverBorder: '#D5CAED',
    }
  ]

  const faqItems = [
    {
      value: 'item-1',
      questions: 'Is BarterHub really free to use?',
      answer: "Yes! Creating an account, listing items, and trading is completely free. We don't charge any fees or commissions. Our platform is supported by optional premium features and community contributions.",
    },
    {
      value: 'item-2',
      questions: "What if I can't find a direct trade match?",
      answer: "This is where our credit system shines! You can trade for credits and then use those credits with any other user. We also support multi-party trades where A trades with B, B with C, and C with A, creating a trade circle.",
    },
    {
      value: 'item-3',
      questions: 'How do you ensure trades are fair?',
      answer: 'We provide value reference guides based on market rates and community consensus. Users negotiate and agree on terms through trade contracts. Our escrow system ensures both parties fulfill their obligations before completing the trade.',
    },
    {
      value: 'item-4',
      questions: 'What happens if something goes wrong?',
      answer: 'You can report issues through our dispute resolution system. Our team reviews the trade contract, messages, and any evidence provided. We work to mediate a fair solution. Users who repeatedly violate terms may be suspended.',
    },
    {
      value: 'item-5',
      questions: 'Can I trade both goods and services?',
      answer: 'Absolutely! BarterHub supports trading physical goods, services, skills, space rental, and more. You can even trade a combination - for example, trading plumbing services plus some tools for furniture.',
    },
    {
      value: 'item-6',
      questions: 'How do credits get their value?',
      answer: 'Credit values are set by the community through market dynamics. We provide suggested values based on typical market rates (e.g., 1 hour of skilled labor ≈ 50 credits), but users ultimately negotiate and agree on values that work for both parties.',
    },
  ]

  return (
    <>
      <section className='bg-[#A5B6B1] w-full py-12 md:py-20'>
        <div className='max-w-360 mx-auto px-4 md:px-8 grid grid-cols-1 items-center gap-12 md:gap-20 lg:gap-25'>
          <div className='text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-poppins font-normal text-white mb-4'>How Bartr Works</h1>
            <p className='text-white text-base lg:text-lg'>Learn how to trade goods and services without money using our simple, secure platform</p>
          </div>
        </div>
      </section>

      <section className='bg-[#e5e5e5] w-full py-10 md:py-16 flex flex-col gap-20'>
        <div className='w-full max-w-sm md:max-w-360 lg:max-w-[60%] mx-auto px-4 md:px-8 flex flex-col items-center gap-12'>
          <h1 className='text-neutral-600 text-xl md:text-2xl lg:text-3xl font-poppins font-light mb-4'>
            Get Started in 4 Simple Steps
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
            {howItWorksSteps.map((step) => {
              const Icon = step.icon;

              return (
                <Card key={step.step} className="w-full bg-white rounded-lg shadow-xs border-neutral-100 px-3 lg:px-6 py-8 hover:shadow-md hover:cursor-pointer transition-shadow">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white text-sm font-semibold mb-6">
                    {step.step}
                  </div>
                  <CardContent className="flex flex-col gap-4 p-0">
                    <div className="flex items-center gap-3">
                      <Icon size={22} className="text-blue-600" />
                      <CardTitle className="text-neutral-700 font-medium">{step.title}</CardTitle>
                    </div>
                    <CardDescription className="text-neutral-600 font-normal">
                      {step.description}
                    </CardDescription>
                    <ul className="flex flex-col gap-2 mt-2">
                      {step.bulletPoints.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm text-neutral-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* COMMENTING OUT CREDIT SYSTEM FOR NOW. After First launch, and constumer gain, we'll refine and re-add it */}
      {/* <section className='bg-[#e5e5e5] w-full py-10 md:py-16 flex flex-col gap-20'>
        <div className='w-full max-w-sm lg:max-w-[60%] mx-auto px-4 md:px-8 flex flex-col items-center gap-12'>
          <div className='text-center max-w-3xl'>
            <h1 className='text-neutral-700 text-2xl md:text-3xl lg:text-4xl font-poppins font-light mb-4'>Understanding the Credit System</h1>
            <p className='text-sm text-neutral-600 font-normal mb-4'>Credits solve the <span className='font-medium'>"double coincidence of wants"</span> problem, making indirect trades possible</p>
          </div>

          <div className='w-full flex flex-col gap-10 items-center bg-orange-100/40 border border-orange-200 rounded-lg px-3 lg:px-6 py-8'>
            <div className='flex flex-col md:flex-row items-start gap-4 w-full px-2 py-4'>
              <TrendingUp className="text-orange-600 size-9" />
              <div className='text-start'>
                <h1 className='text-neutral-700 text-2xl lg:text-2xl font-poppins font-normal mb-2'>How Credits Work</h1>
                <p className='text-sm text-neutral-600 font-normal'>Credits are a virtual currency within BarterHub that facilitate trades when direct barter isn't possible. Think of them as "trade tokens" that represent value.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
              {creditSystems.map((step) => {
                return (
                  <Card key={step.title} className="w-full bg-white rounded-lg shadow-xs px-3 py-4 border-none hover:shadow-md hover:cursor-pointer transition-shadow">
                    <CardContent className="flex flex-col gap-2 p-0">
                      <div className="flex items-center">
                        <CardTitle className="text-lg text-neutral-700 font-medium">{step.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm text-neutral-600 font-normal">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className='flex items-center gap-4 w-full'>
              <Card className="w-full bg-white rounded-lg shadow-xs px-3 py-4 border-none hover:shadow-md hover:cursor-pointer transition-shadow">
                <CardContent className="flex flex-col gap-2 p-0">
                  <div className="flex items-center">
                    <CardTitle className="text-sm text-neutral-700 font-normal">Example:</CardTitle>
                  </div>
                  <CardDescription className="text-sm text-neutral-600 font-normal">
                    Alice offers web design (150 credits) to Bob, who offers photography (150 credits). If Bob doesn't need web design, Alice can use her 150 credits to trade with Carol for graphic design instead. This creates a flexible, circular economy.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      <section className='bg-[#e5e5e5] w-full py-10 md:py-16 flex flex-col gap-20'>
        <div className='w-full max-w-sm md:max-w-360 lg:max-w-[60%] mx-auto px-4 md:px-8 flex flex-col items-center gap-12'>
          <h1 className='text-neutral-600 text-xl md:text-2xl lg:text-3xl font-poppins font-light mb-4'>
            Trust & Safety Features
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            {safetyFeatures.map((step, index) => (
              <Card key={index} className={`w-full bg-white rounded-lg shadow-xs ring-0 border-neutral-100 px-3 lg:px-6 py-8 ${step.hoverBorder} hover:shadow-lg hover:cursor-pointer transition-shadow`} onMouseEnter={(e) => e.currentTarget.style.borderColor = step.hoverBorder} onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
                <step.icon className={`mb-6 size-9 ${step.iconColor}`} style={{ color: step.iconColor }} />
                <CardContent className="flex flex-col items-start justify-center gap-4 p-0">
                    <CardTitle className='text-neutral-700 font-medium'>{step.title}</CardTitle>
                    <CardDescription className='text-neutral-600 font-normal'>
                      {step.description}
                    </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[#e5e5e5] w-full py-10 md:py-16 flex flex-col gap-20'>
        <div className='w-full max-w-sm md:max-w-360 lg:max-w-[60%] mx-auto px-4 md:px-8 flex flex-col items-center gap-12'>
          <h1 className='text-neutral-600 text-xl md:text-2xl lg:text-3xl font-poppins font-light mb-4'>
            Frequently Asked Questions
          </h1>

          <div className='w-full flex flex-col gap-10 items-center shadow-xs bg-white border border-neutral-100 rounded-lg px-3 lg:px-6 py-8'>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem key={item.value} value={item.value} className='text-sm font-normal text-neutral-600 border-b-neutral-200'>
                  <AccordionTrigger className='font-normal'>{item.questions}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className='bg-[#e5e5e5] w-full py-10 md:py-16'>
        <div className='w-full max-w-sm md:max-w-360 lg:max-w-[60%] mx-auto px-4 md:px-8 py-8'>
          <div className='bg-[#eeebe7] flex flex-col items-center gap-12 rounded-lg px-4 md:px-8 py-8'>
            <div className='text-center'>
              <h1 className='text-neutral-600 text-xl md:text-2xl lg:text-3xl font-poppins font-light mb-4'>
                Ready to Start Trading?
              </h1>
              <p className='text-neutral-600 text-base lg:text-lg'>Join thousands of users exchanging value without money</p>
            </div>

            <div className='flex flex-col md:flex-row gap-4 lg:gap-6'>
              <Button className='group rounded-lg bg-white text-neutral-600 cursor-pointer shadow-black/20 shadow-xs hover:shadow-sm px-3 lg:px-5' onClick={() => router.push('/auth')}>
                Create Free Account
                <ArrowRight className='transition-transform duration-200 group-hover:translate-x-1' />
              </Button>
              <Button className='rounded-lg bg-transparent text-neutral-600 cursor-pointer border border-neutral-400/30 shadow-neutral-300 shadow-xs hover:shadow-sm px-3 lg:px-5' onClick={() => router.push('/marketplace')}>Browse Marketplace</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}