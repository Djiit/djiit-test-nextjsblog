import { queryRepeatableDocuments } from "utils/queries";
import { Client } from "utils/prismicHelpers";
import DefaultLayout from "layouts";

/**
 * posts component
 */
const Page = ({ doc }) => {
  if (doc && doc.data) {
    return (
      <DefaultLayout>
        <div>Hello</div>
      </DefaultLayout>
    );
  }
  return null;
};

export async function getStaticProps({ params, locale, locales }) {
  const client = Client();
  const doc =
    (await client.getByUID("page", params.uid, { lang: locale })) || {};

  return {
    props: { doc },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "page"
  );
  return {
    paths: documents.map((doc) => {
      return { params: { uid: doc.uid } };
    }),
    fallback: false,
  };
}

export default Page;
