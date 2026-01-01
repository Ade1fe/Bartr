'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Handshake, MessageSquare, Search, Shield, Star, Tags, Users } from "lucide-react";
import Image from "next/image";
import { Bartr } from "../../../public/img";

export default function Page() {
  const bartrProcess = [
    { title: 'Create an Account', description: 'Sign up on Bartr and verify your account, to start your bartering journey.', icon: Users, iconBg: '#caf0f8', iconColor: '#00b4d8', hoverBorder: '#caf0f8' },
    { title: 'List Your Items', description: 'Upload items or services you want to trade with clear descriptions and images.', icon: Tags, iconBg: '#F0FFF4', iconColor: '#388C68', hoverBorder: '#AEF0D3' },
    { title: 'Browse Offers', description: 'Explore listings from other users to find items or services you need.', icon: Search, iconBg: '#cbf3f0', iconColor: '#1b4332', hoverBorder: '#95d5b2' },
    { title: 'Initiate Trade', description: 'Contact other users to propose trades and negotiate terms.', icon: MessageSquare, iconBg: '#EBE8F6', iconColor: '#5a189a', hoverBorder: '#c8b6ff' },
    { title: 'Complete the Exchange', description: 'Meet up or ship items to finalize the trade securely.', icon: Handshake, iconBg: '#E0F2F2', iconColor: '#2F6364', hoverBorder: '#ABF2F3' },
    { title: 'Build Trust', description: 'Rate trades, build reputation, and become a trusted member of the community.', icon: Shield, iconBg: '#fff0f3', iconColor: '#85182a', hoverBorder: '#F8D8DE' },
  ]

  return (
    <>
      <section className='bg-[#A5B6B1] w-full py-10 md:py-16'>
        <div className='max-w-360 mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 md:gap-20 lg:gap-25'>
          <div>
            <h1 className='text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-poppins font-normal text-white mb-4'>Trade Without Money</h1>
            <p className='text-white text-base lg:text-lg mb-4'>Exchange goods and services directly with others. No cash needed, just value for value.</p>
            <div className='flex mb-9 md:mb-12 gap-4 lg:gap-6'>
              <Button className='rounded-lg bg-black text-white cursor-pointer shadow-black/20 shadow-xs hover:shadow-sm px-3 lg:px-5'>Get Started</Button>
              <Button className='rounded-lg bg-white text-neutral-600 cursor-pointer shadow-neutral-300 shadow-xs hover:shadow-sm px-3 lg:px-5'>Browse Marketplace</Button>
            </div>
            <div className='text-white flex gap-4 md:gap-8'>
              <div>
                <div className="text-2xl mb-1">10K+</div>
                <div className="text-xs md:text-sm">Active Users</div>
              </div>
              <div>
                <div className="text-2xl mb-1">25K+</div>
                <div className="text-xs md:text-sm">Trades Completed</div>
              </div>
              <div>
                <div className="text-2xl mb-1 flex items-center gap-1">4.8 <Star className='text-white fill-white' /></div>
                <div className="text-xs md:text-sm">Avg Rating</div>
              </div>
            </div>
          </div>

          <FieldSet className='bg-white rounded-xl px-4 py-6 md:p-8 shadow-md relative'>
            <FieldGroup className="overflow-hidden">
              <Field className="p-1">
                <InputGroup className='border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600'>
                  <InputGroupInput placeholder="Search..." className='text-[0.813rem] md:text-sm border-0 focus:border-0 focus-visible:border-0 outline-0 focus:outline-0 focus-visible:outline-0' />
                  <InputGroupAddon>
                    <Search size={16} />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end" className='text-[0.813rem] md:text-sm'>12 results</InputGroupAddon>
                </InputGroup>
              </Field>
              <Field className='overflow-y-auto max-h-96 md:max-h-112 mt-4 space-y-4'>
                <Item variant="outline" className="rounded-xl border-neutral-200 hover:border-neutral-300 hover:cursor-pointer shadow-xs items-start flex flex-col md:flex-row md:items-center">
                  <ItemContent className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className='relative h-16 w-20 shadow-xs rounded-lg'>
                      <Image src={Bartr} alt='' fill className='object-contain' loading='lazy' />
                    </div>
                    <div className="w-full">
                      <ItemTitle className='text-neutral-700 font-medium'>Basic Item</ItemTitle>
                      <ItemDescription className="text-wrap text-[0.813rem] md:text-sm text-neutral-600">
                        A simple item with title and description.
                      </ItemDescription>
                    </div>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm" className="border-neutral-100 text-[#1F453D] cursor-pointer">
                      Open to trades
                    </Button>
                  </ItemActions>
                </Item>
                <Item variant="outline" className="rounded-xl border-neutral-200 hover:border-neutral-300 hover:cursor-pointer shadow-xs items-start flex flex-col md:flex-row md:items-center">
                  <ItemContent className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className='relative h-16 w-20 shadow-xs rounded-lg'>
                      <Image src={Bartr} alt='' fill className='object-contain' loading='lazy' />
                    </div>
                    <div className="w-full">
                      <ItemTitle className='text-neutral-700 font-medium'>Basic Item</ItemTitle>
                      <ItemDescription className="text-wrap text-[0.813rem] md:text-sm text-neutral-600">
                        A simple item with title and description.
                      </ItemDescription>
                    </div>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm" className="border-neutral-100 text-[#1F453D] cursor-pointer">
                      Open to trades
                    </Button>
                  </ItemActions>
                </Item>
                <Item variant="outline" className="rounded-xl border-neutral-200 hover:border-neutral-300 hover:cursor-pointer shadow-xs items-start flex flex-col md:flex-row md:items-center">
                  <ItemContent className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className='relative h-16 w-20 shadow-xs rounded-lg'>
                      <Image src={Bartr} alt='' fill className='object-contain' loading='lazy' />
                    </div>
                    <div className="w-full">
                      <ItemTitle className='text-neutral-700 font-medium'>Basic Item</ItemTitle>
                      <ItemDescription className="text-wrap text-[0.813rem] md:text-sm text-neutral-600">
                        A simple item with title and description.
                      </ItemDescription>
                    </div>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm" className="border-neutral-100 text-[#1F453D] cursor-pointer">
                      Open to trades
                    </Button>
                  </ItemActions>
                </Item>
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
      </section>

      <section className='bg-[#e5e5e5] w-full py-10 md:py-16'>
        <div className='max-w-360 mx-auto px-4 md:px-8 flex flex-col items-center gap-12'>
          <div className='text-center max-w-2xl'>
            <h1 className='text-neutral-700 text-2xl md:text-3xl lg:text-4xl font-poppins font-normal mb-4'>How Bartr Works</h1>
            <p className='text-base text-neutral-700 lg:text-lg mb-4'>Simple, secure, and efficient bartering</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bartrProcess.map((step, index) => (
              <Card key={index} className={`w-full max-w-sm bg-white rounded-lg shadow-xs ring-0 border-neutral-100 px-4 py-8 ${step.hoverBorder} hover:shadow-lg hover:cursor-pointer transition-shadow`} onMouseEnter={(e) => e.currentTarget.style.borderColor = step.hoverBorder} onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-8 ${step.iconBg}`} style={{ backgroundColor: step.iconBg }}><step.icon size={20} className={`${step.iconColor}`} style={{ color: step.iconColor }} /></div>
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

      <section className='bg-[#eeebe7] w-full py-10 md:py-16'>
        <div className='max-w-360 mx-auto px-4 md:px-8 flex flex-col items-center gap-12'>
          <div className='text-center max-w-2xl'>
            <h1 className='text-neutral-700 text-2xl md:text-3xl lg:text-4xl font-poppins font-normal mb-4'>Ready to Start Trading?</h1>
            <p className='text-base text-neutral-700 lg:text-lg mb-4'>Join thousands of users exchanging value without money</p>
            <Button className='rounded-lg bg-white text-neutral-700 cursor-pointer shadow-neutral-300 shadow-xs hover:shadow-sm px-3 lg:px-5'>Create Free Account</Button>
          </div>
        </div>
      </section>
    </>
  )
}