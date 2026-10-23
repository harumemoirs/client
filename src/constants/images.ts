/**
 * Centralized registry for static/layout images hosted on Cloudinary.
 *
 * NOTE: Dynamic blog images (post content, user uploads) come from the database / API
 * and are deliberately excluded from this file.
 *
 * To change any static/branding visual in the project, simply update the URL here.
 */

export const IMAGES = {
  home: {
    hero: "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_1200/v1764268054/hero-section_ynlism.jpg",
    categories: {
      poetry:
        "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_1200/v1764268053/haru-poetry-hero-section_wezfsf.jpg",
      letters:
        "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_1200/v1764410908/hero-3rd-bottom-2ndoption_jnzptm.jpg",
      selfReflection:
        "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_1200/v1764268173/self-reflection-hero-section_z335pj.jpg",
      journals:
        "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_1200/v1764268054/journal-hero-section_gyxsgr.jpg",
    },
    author:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/v1792768502/author-img-02_yt5hcv.jpg",
    contactPreview:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1764268052/contact-us-1st-option_xsblwl.jpg",
  },

  about: {
    heroLeft:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_500,h_400,c_fill/v1764270160/hero-1st-left-2ndoption_vwkkk2.jpg",
    heroRight:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_500,h_400,c_fill/v1764270229/hero-2nd-right-2ndoption_e5qrrp.jpg",
    heroBottom:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_1000/v1764270282/hero-3rd-bottom-1stoption_skluef.jpg",
    author:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/v1792768502/author-img-02_yt5hcv.jpg",
    portfolio:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_800/v1764270461/portfolio-3rdoption_p6yoyt.jpg",
    services:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_600/v1764270631/about-page-services_xzbpcc.jpg",
    getInTouch:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1764270116/get-in-touch-4thoption_koszeg.jpg",
  },

  contact: {
    hero: "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_1200/v1765482920/contact-us-3rd-option_ahjgvu.jpg",
    fromTheCoastLeft:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_1000/v1764268024/from-the-coast-left_lvfbfq.jpg",
    fromTheCoastRight:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1764268024/from-the-coast-right_f9k1gy.jpg",
  },

  blogs: {
    categoryHeroes: {
      ALL: "https://res.cloudinary.com/dwtbvdlzg/image/upload/w_1200,h_800,c_fill/v1765380884/hero-1st-left_bc863k.jpg",
      LETTERS:
        "https://res.cloudinary.com/dwtbvdlzg/image/upload/w_1200,h_800,c_fill/v1765552632/lavdi_n3eyiq.jpg",
      POETRY:
        "https://res.cloudinary.com/dwtbvdlzg/image/upload/w_1200,h_800,c_fill/v1765538787/1st-tides-of-change-2ndoption_uigzqo.jpg",
      SELF_REFLECTION:
        "https://res.cloudinary.com/dwtbvdlzg/image/upload/w_1200,h_800,c_fill/v1765539681/bc_ibghcv.jpg",
      JOURNALS:
        "https://res.cloudinary.com/dwtbvdlzg/image/upload/w_1200,h_800,c_fill/v1765539067/journal-hero_xs6ysv.jpg",
    },
    shareStoryLeft:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764268082/contact-us-left-one_i9tatw.jpg",
    shareStoryRight:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764268082/contact-us-right-one_vnmcpw.jpg",
    authorAvatar:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/v1792768502/author-img-02_yt5hcv.jpg",
    fallbackCover:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_1600/v1765380884/hero-1st-left_bc863k.jpg",
  },

  shared: {
    newsletter:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_800/v1764268054/newsletter_m5xiwj.jpg",
    newsletterWide:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_1200/v1764268054/newsletter_m5xiwj.jpg",
    footer:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764268052/footer-1st-option_ieu0oz.jpg",
    notFound:
      "https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764268054/hero-section_ynlism.jpg",
  },
} as const;

export type ImageRegistry = typeof IMAGES;
