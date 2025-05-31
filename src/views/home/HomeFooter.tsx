/**
 * Views：home footer
 * @author songmm
 */

function HomeFooter() {
  const projectLinks = [
    {
      name: 'Github'
    },
    {
      name: 'Gitee'
    }
  ]

  const aboutLinks = [
    {
      name: 'Company',
      links: [
        {
          name: 'About'
        },
        {
          name: 'Features'
        },
        {
          name: 'Works'
        },
        {
          name: 'Career'
        }
      ]
    },
    {
      name: 'Help',
      links: [
        {
          name: 'Customer Support'
        },
        {
          name: 'Delivery Details'
        },
        {
          name: 'Terms & Conditions'
        },
        {
          name: 'Privacy Policy'
        }
      ]
    }
  ]

  return (
    <footer>
      <section className="py-10 bg-card common-shadow">
        <div className="px-4 mx-auto sm:px-6  pc:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:col-span-3  pc:grid-cols-6 gap-y-16 gap-x-12">
            <div className="col-span-2 md:col-span-3  pc:col-span-2  pc:pr-8">
              <div>Logo</div>
              <p className="leading-relaxed mt-7">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              <ul className="flex items-center space-x-3 mt-9">
                {projectLinks.map((link, index) => (
                  <li key={index}>
                    <a className="flex items-center justify-center transition-all">
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {aboutLinks.map((type, index) => (
              <div key={index}>
                <p className="font-semibold tracking-widest text-gray-400 uppercase">{type.name}</p>
                <ul className="mt-6 space-y-4">
                  {type.links.map((link, index) => (
                    <li key={index}>
                      <a className="flex transition-all duration-200 hover:text-blue-600 focus:text-blue-600">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 md:col-span-1  pc:col-span-2  pc:pl-8 max-phone:hidden max-pad:hidden">
              <p className="font-semibold tracking-widest uppercase">Subscribe to newsletter</p>

              <div className="mt-6">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="border border-primary rounded-xl block w-full p-4  transition-all duration-200 bg-card "
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl border border-primary inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold transition-all duration-200 "
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <hr className="mt-16 mb-10 border-border" />

          <p className="text-sm text-center">© Copyright 2025, All Rights Reserved by {import.meta.env.VITE_APP_TITLE}</p>
        </div>
      </section>
    </footer>
  )
}

export default HomeFooter
