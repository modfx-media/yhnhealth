import ServicePage from "@/components/page/ServicePage";
import ModulePage from "@/components/page/ModulePage";
import AreaCityPage from "@/components/page/AreaCityPage";
import AreaServicePage from "@/components/page/AreaServicePage";
import ArticlePostClient from "@/app/(site)/articles/[slug]/ArticlePostClient";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd, areaCityJsonLd, areaServiceJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/siteUrl";
import { getArticleAuthor } from "@/lib/articlesData";
import type { RoutedContent } from "@/lib/cms/query";
import { pageCityService, pageToModuleConfig, pageToServiceConfig, postToArticle } from "@/lib/cms/mapPage";
import HomePageView from "@/components/home/HomePageView";
import { LegalFromCMS } from "./LegalFromCMS";

export function RenderRoutedContent({
  routed,
  fallback,
}: {
  routed: RoutedContent;
  fallback: React.ReactNode;
}) {
  if (routed.collection === "posts") {
    const article = postToArticle(routed.doc);
    return (
      <>
        <JsonLd
          data={articleJsonLd({
            title: article.title,
            description: article.excerpt,
            url: `${SITE_URL}/articles/${article.slug}`,
            image: article.image,
            datePublished: routed.doc.publishDate || undefined,
            author: getArticleAuthor(article),
          })}
        />
        <ArticlePostClient article={article} related={[]} />
      </>
    );
  }

  const { doc } = routed;
  switch (doc.template) {
    case "home":
      return <HomePageView />;
    case "service": {
      const config = pageToServiceConfig(doc);
      return config ? <ServicePage config={config} /> : fallback;
    }
    case "module": {
      const config = pageToModuleConfig(doc);
      return config ? <ModulePage config={config} /> : fallback;
    }
    case "legal":
      return doc.body || doc.sections?.length ? <LegalFromCMS doc={doc} /> : fallback;
    case "area-city": {
      const { city } = pageCityService(doc);
      if (!city) return fallback;
      return (
        <>
          <JsonLd data={areaCityJsonLd(city)} />
          <AreaCityPage city={city} />
        </>
      );
    }
    case "area-service": {
      const { city, service } = pageCityService(doc);
      if (!city || !service) return fallback;
      return (
        <>
          <JsonLd data={areaServiceJsonLd(city, service)} />
          <AreaServicePage city={city} service={service} />
        </>
      );
    }
    default:
      return fallback;
  }
}
