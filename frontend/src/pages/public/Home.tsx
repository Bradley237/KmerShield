import React from 'react'
import { Hero } from '../../components/home/Hero'
import { Problem } from '../../components/home/Problem'
import { HowItWorks } from '../../components/home/HowItWorks'
import { Limits } from '../../components/home/Limits'
import { Faq } from '../../components/home/Faq'
import { FinalCta } from '../../components/home/FinalCta'

export const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Le Problème Section */}
      <Problem />

      {/* 3. Comment ça marche Section with Risk Level Cards */}
      <HowItWorks />

      {/* 4. Limites Section (Always Dark) */}
      <Limits />

      {/* 5. FAQ Section */}
      <Faq />

      {/* 6. Final CTA Band */}
      <FinalCta />
    </div>
  )
}
