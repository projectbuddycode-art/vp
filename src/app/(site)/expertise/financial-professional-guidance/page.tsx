import { ServiceView } from "@/components/expertise/ServiceView";
import { pageMetadata } from "@/lib/seo";
import { getService } from "@/lib/site";

const service = getService("financial-professional-guidance")!;

export const metadata = pageMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: `/expertise/${service.slug}`,
  image: service.image.src,
});

export default function Page() {
  return <ServiceView service={service} />;
}
