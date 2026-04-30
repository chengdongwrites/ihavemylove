import SubscribeForm from './SubscribeForm'

export default function SiteFooter() {
  return (
    <footer className="border-t border-amber-200/40 dark:border-gray-800/60 mt-16 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-serif text-accent dark:text-amber-500 text-base tracking-widest mb-2">
          我有所爱，且为所爱
        </p>
        <p className="font-sans text-xs text-gray-400 dark:text-gray-600 tracking-wide mb-1">
          ihavemylove.life · littlepeople.life
        </p>
        <p className="font-sans text-xs text-gray-300 dark:text-gray-700 tracking-wide">
          © 洛城东 · All rights reserved · 版权为作者所有 · 转载请联系 chengdongwrites@gmail.com
        </p>
        <SubscribeForm />
      </div>
    </footer>
  )
}
