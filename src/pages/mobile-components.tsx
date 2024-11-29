import * as React from "react"
import { useState, useEffect } from 'react'
import { Sidebar } from "@/components/layout/Sidebar"
import { mobileComponents } from "@/data/mobile-components"

interface ComponentSection {
  id: string
  name: string
  href: string
}

export function MobileComponentsPage() {
  const [activeSection, setActiveSection] = useState(mobileComponents[0].id)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (!hash.startsWith('mobile-components/')) return
      
      const sectionId = hash.replace('mobile-components/', '')
      const section = mobileComponents.find(c => c.id === sectionId)
      if (section) {
        setActiveSection(section.id)
        const element = document.querySelector(`#${section.id}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        setActiveSection(mobileComponents[0].id)
        window.location.hash = `mobile-components/${mobileComponents[0].id}`
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleSectionChange = (sectionId: string) => {
    const section = mobileComponents.find(c => c.id === sectionId)
    if (section) {
      setActiveSection(section.id)
      window.location.hash = `mobile-components/${section.id}`
      const element = document.querySelector(`#${sectionId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const sections: ComponentSection[] = mobileComponents.map(comp => ({
    id: comp.id,
    name: comp.title,
    href: comp.href
  }))

  return (
    <div className="min-h-screen bg-[#F3F5FA]">
      <div className="flex">
        <Sidebar
          sections={sections}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        <main className="pl-64 w-full">
          <div className="mx-auto max-w-[1200px] p-8 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
              {mobileComponents.map((component) => (
                <div 
                  key={component.id} 
                  id={component.id} 
                  className="bg-white rounded-lg shadow-3 transition-shadow duration-200 scroll-mt-24"
                >
                  <div className="p-6">
                    <h2 className="text-[20px] font-medium mb-6">{component.title}</h2>
                    {component.component()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
