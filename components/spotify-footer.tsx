"use client"

import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"
import { useTranslation } from "@/lib/language-context"

export function SpotifyFooter() {
  const { t } = useTranslation()

  return (
    <footer className="bg-black border-t border-[#2a2a2a] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h3 className="text-[#919496] text-xs font-bold mb-4 uppercase tracking-wider">{t.footer.company}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.jobOffers}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.forTheRecord}
                </Link>
              </li>
            </ul>
          </div>

          {/* Communities */}
          <div>
            <h3 className="text-[#919496] text-xs font-bold mb-4 uppercase tracking-wider">{t.footer.communities}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.artistsArea}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.developers}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.advertising}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.investors}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.suppliers}
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-[#919496] text-xs font-bold mb-4 uppercase tracking-wider">{t.footer.usefulLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.assistance}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.webReader}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.freeMobileApp}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.importMusic}
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscriptions */}
          <div>
            <h3 className="text-[#919496] text-xs font-bold mb-4 uppercase tracking-wider">{t.footer.subscriptions}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.premiumStaff}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.premiumDuo}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.premiumFamily}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.premiumStudents}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-[#1ed760] text-sm transition-colors">
                  {t.footer.spotifyFree}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-end gap-4 mb-12">
          <Link
            href="#"
            className="w-10 h-10 rounded-full bg-[#222326] hover:bg-[#2a2a2a] flex items-center justify-center transition-colors"
          >
            <Instagram className="w-5 h-5 text-white" />
          </Link>
          <Link
            href="#"
            className="w-10 h-10 rounded-full bg-[#222326] hover:bg-[#2a2a2a] flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="w-10 h-10 rounded-full bg-[#222326] hover:bg-[#2a2a2a] flex items-center justify-center transition-colors"
          >
            <Facebook className="w-5 h-5 text-white" />
          </Link>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 border-t border-[#2a2a2a]">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#919496]">
            <Link href="#" className="hover:text-[#1ed760] transition-colors">
              {t.footer.legal}
            </Link>
            <Link href="#" className="hover:text-[#1ed760] transition-colors">
              {t.footer.securityPrivacy}
            </Link>
            <Link href="#" className="hover:text-[#1ed760] transition-colors">
              {t.footer.dataProtection}
            </Link>
            <Link href="#" className="hover:text-[#1ed760] transition-colors">
              {t.footer.cookieSettings}
            </Link>
            <Link href="#" className="hover:text-[#1ed760] transition-colors">
              {t.footer.aboutAds}
            </Link>
            <Link href="#" className="hover:text-[#1ed760] transition-colors">
              {t.footer.accessibility}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-white hover:text-[#1ed760] transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" />
                <path d="M8 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              <span className="text-xs font-semibold">United States</span>
            </button>
            <span className="text-xs text-[#919496]">{t.footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
