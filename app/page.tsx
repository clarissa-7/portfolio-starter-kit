import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        The Horizon Residences Portal: Keeping Our Community Connected
      </h1>
      <p className="mb-4">
        {`As a Strata Committee, we believe in proactive and transparent management, 
        finding efficiency in clear processes and open communication to address the
        diverse needs of our residents. This extends to our commitment to financial
        responsibility, where early and diligent planning ensures the long-term stability 
        of our building, and our preference for resident feedback, which eases community 
        engagement and strengthens our collaborative environment.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
