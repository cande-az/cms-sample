const data = {
  pages: [
    {
      id: 1,
      title: "home",
      components: [
        {
          codename: "ui_button",
          dictionaries: ["", ""],
          title: "button",
          navlinks: [],
          requests: ["", ""],
        },
        {
          codename: "ui_button1",
          dictionaries: ["", ""],
          title: "button1",
          navlinks: [],
          requests: ["", ""],
        },
      ],
      slug: ["home"],
    },
    {
      id: 2,
      title: "menu",
      components: [],
      slug: ["test", "menu"],
    },
  ],
};

const slugToString = (arr: any[]) => {
  return arr.join("/").toLowerCase();
};

function Home({ page }: any) {
  return (
    <>
      Hello Dynamic {page?.id}: {page?.title}
    </>
  );
}

export async function getStaticPaths() {
  const paths = data.pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const { slug } = params;
  const thisPage = data.pages.filter((page) => {
    return slugToString(page.slug) === slugToString(slug);
  })[0];

  return { props: { page: thisPage } };
}

export default Home;