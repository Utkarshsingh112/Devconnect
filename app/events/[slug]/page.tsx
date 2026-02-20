import EventDetails from "@/app/components/EventDetails";
import { Suspense } from "react";

const EventDetailsPage =async ({params}:{params:Promise<{slug:string}>}) => {
  const slug=params.then((p)=>p.slug)
    return(
      <div>
        <main>
          <Suspense fallback={<p>Loading...</p>}>
            <EventDetails params={slug}/>
          </Suspense>
        </main>
      </div>
    )
}

export default EventDetailsPage;