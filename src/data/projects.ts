export type ProjectClient = 'Client' | 'Personal' | 'Concept';
export type ProjectCategory = 'All' | 'Design' | 'Photography' | 'Web' | 'Video';
export type ProjectInteraction = 'link' | 'lightbox' | 'gallery' | 'external';

export interface Project {
  id: string;
  title: string;
  image?: string;
  images?: string[];
  video?: string[]; // Can be a single video or multiple videos for lightbox
  videoThumbnail?: string; // Single lower quality video for gallery thumbnails
  category: ProjectCategory;
  client: ProjectClient;
  interaction: ProjectInteraction;
  content: string;
  tags?: string[];
  date: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'ooji-shirt',
    title: 'Tee Shirt for OOJI Studios',
    image: 'https://live.staticflickr.com/65535/54439965895_51c516b7dc_c_d.jpg',
    images: [
      'https://live.staticflickr.com/65535/54439965895_5fed47a028_k_d.png',
    ],
    category: 'Design',
    client: 'Client',
    interaction: 'link',
    content: 'A vintage-inspired, square, graphic-tee design for streetwearbrand OOJI.',
    tags: ['Graphic Tee', 'Streetwear', 'Fashion'],
    date: '2022-07-12',
    featured: false
  },
  {
    id: 'wintour-book',
    title: 'Book Cover for Anna Wintour',
    image: 'https://live.staticflickr.com/65535/54439777859_7e55cc3b10_c_d.jpg',
    images: [
      'https://live.staticflickr.com/65535/54439777859_96a3299844_k_d.png',
      'https://live.staticflickr.com/65535/54439586446_d459cefc99_k_d.png',
    ],
    category: 'Design',
    client: 'Concept',
    interaction: 'link',
    content: 'Tasked with bringing fashionista Anna Wintour\'s <i>Ugly</i> to life. Marketed with the tagline, "the perception of beauty throughout the ages," this cover, spine, and back juxtapose historical beauty against modern standards. Portrait by Lloyd Bishop.',
    tags: ['Book', 'Typogrpahy'],
    date: '2024-10-24',
    featured: true
  },
  {
    id: 'cosmopolitan-ad',
    title: 'The Cosmopolitan Billboard & Banner Ad',
    image: 'https://live.staticflickr.com/65535/54439572831_88722639d8_c_d.jpg',
    images: [
      'https://live.staticflickr.com/65535/54439572831_c8e9947206_k_d.png',
      'https://live.staticflickr.com/65535/54439572891_525c8e67c8_k_d.png',
    ],
    category: 'Design',
    client: 'Concept',
    interaction: 'link',
    content: 'A product design project that emphasizes clean lines, functional simplicity, and sustainable materials. The design process included extensive prototyping and user testing to ensure optimal usability and aesthetic appeal.',
    tags: ['Marketing', 'Advertising', 'Billboard', 'Mobile'],
    date: '2024-11-14',
    featured: true
  },
  {
    id: 'photo-little-tokyo',
    title: '@ Little Tokyo',
    image: 'https://live.staticflickr.com/65535/54439853798_d6a70be437_c_d.png',
    images: [
      'https://live.staticflickr.com/65535/54439853798_d6a70be437_k_d.png',
    ],
    category: 'Photography',
    client: 'Personal',
    interaction: 'lightbox',
    content: '',
    tags: [],
    date: '2023-07-10',
    featured: false
  },
  {
    id: 'photo-mount fuji',
    title: '@ Mount Fuji',
    image: 'https://live.staticflickr.com/65535/54439853628_3b059a39e0_c_d.png',
    images: [
      'https://live.staticflickr.com/65535/54439853628_3b059a39e0_k_d.png',
    ],
    category: 'Photography',
    client: 'Personal',
    interaction: 'lightbox',
    content: '',
    tags: [],
    date: '2025-02-25',
    featured: false
  },
  {
    id: 'art-resonant-sound',
    title: 'A Resonant Sound That Seemingly Stops Time',
    image: 'https://live.staticflickr.com/65535/54439759554_048c3ab912_c_d.jpg',
    images: [
      'https://live.staticflickr.com/65535/54439759554_99a1063516_k_d.png',
    ],
    category: 'Photography',
    client: 'Personal',
    interaction: 'link',
    content: '<i>A Resonant Sound That Seemingly Stops Time,</i> was taken in Lake Havasu City, Arizona. The photograph was repeatedly printed and scanned, using tape and sandpaper to weather the ink. The resulting image is obscured, reminiscent of a distant, faded memory. A strong emphasis is placed on creating guiding lines and shapes, while the design and framing of the piece are intended to reinforce this idea. A striking contrast emerges between the rigid, geometric lines of the photograph itself and the masking tape framing it, and the organic, white distressing. Texture was created through a variety of methods, including physical distressing and digital editing; This work is a multimedia exercise in photography, design, and personal expression, and the intersection of these mediums.',
    tags: ['Mixed Media', 'Art'],
    date: '2024-04-06',
    featured: true
  },
  {
    id: 'cpfm-mystery-box',
    title: 'McDonald\'s C.P.F.M Mystery Box',
    image: 'https://live.staticflickr.com/65535/54438718382_c1524bda7c_c_d.jpg',
    images: [
      'https://live.staticflickr.com/65535/54438718382_8c88f582c7_k_d.png',
      'https://live.staticflickr.com/65535/54439946205_3c9f9d44f9_k_d.png',
    ],
    category: 'Design',
    client: 'Concept',
    interaction: 'link',
    content: 'Tasked with producing packaging for the McDonald\'s & Cactus Plant Flea Market toy collaboration. Marketed as a mystery blind box, the package appeals to McDonald\'s fans, with its recognisable characters, and CPFM collectors, employing the brand\s iconic, bold text. Assets by McDonald\'s. Custom background artwork.',
    tags: ['3D', 'Product Design', 'Packaging'],
    date: '2024-12-15',
    featured: true
  },
  {
    id: 'art-ascii',
    title: 'Untitled <i>[ASCII]</i>',
    image: 'https://live.staticflickr.com/65535/54441473412_fbeaee21c1_c_d.jpg',
    images: [
      'https://live.staticflickr.com/65535/54441473412_5a194ae166_k_d.jpg',
    ],
    category: 'Design',
    client: 'Personal',
    interaction: 'lightbox',
    content: '',
    tags: [],
    date: '2023-12-24',
    featured: false
  },
  {
    id: 'fantastic-man-editorial',
    title: 'Fantastic Man Magazine Cover & Spread',
    image: 'https://live.staticflickr.com/65535/54439879400_d14b1b7263_c_d.jpg',
    images: [
      'https://live.staticflickr.com/65535/54439508771_776a4f787a_k_d.png',
      'https://live.staticflickr.com/65535/54439879400_9bbbcbe686_k_d.png',
    ],
    category: 'Design',
    client: 'Concept',
    interaction: 'link',
    content: 'Tasked with redesigning a magazine cover and two-page spread for <i>Fantastic Man\'s</i> fourteenth issue starring Raf Simons: the enigmatic, avant-grade Belgian fashion designer. Mysterious, yet modern. Photography by Willy Vanderperre.',
    tags: ['Editorial Design', 'Fashion', 'Typogrpahy'],
    date: '2024-09-02',
    featured: false
  },
  {
    id: 'tesla-report',
    title: 'Tesla Annual Report',
    image: 'https://live.staticflickr.com/65535/54439527256_d3cd64d92a_c_d.jpg',
    images: [
      'https://live.staticflickr.com/65535/54439527256_119c99a3a5_k_d.png',
      'https://live.staticflickr.com/65535/54439898315_4bbe2007f1_k_d.png',
      'https://live.staticflickr.com/65535/54439718474_aa6c650fe8_k_d.png',
    ],
    category: 'Design',
    client: 'Concept',
    interaction: 'link',
    content: 'Tasked with building an annual report for Tesla. In an AI-driven era where brands appear increasingly soulless, this booklet takes Tesla in a uniquely organic and human direction, without sacrificing its innovative, cutting-edge quality. Assets via Freepik. Custom dotted artwork. Photography by Makara Hang, Lynx Exotics, and Willian Cittadin.',
    tags: ['Annual Report', 'Brochure'],
    date: '2024-12-10',
    featured: true
  },
  {
    id: 'photo-japan-one',
    title: '@ Japan',
    image: 'https://live.staticflickr.com/65535/54438762672_4d2086a97f_k_d.jpg',
    images: [
      'https://live.staticflickr.com/65535/54438762672_4d2086a97f_k_d.jpg',
      'https://live.staticflickr.com/65535/54439991300_edaef27c3b_k_d.jpg',
      'https://live.staticflickr.com/65535/54438762597_ae79ab67a9_k_d.jpg',
    ],
    category: 'Photography',
    client: 'Personal',
    interaction: 'lightbox',
    content: '',
    tags: [],
    date: '2025-01-10',
    featured: true
  },
  {
    id: 'video-balenciaga',
    title: 'Balenciaga Advert',
    video: [
      '/images/balenciaga-HQ.mp4'
    ], // Full quality video for lightbox
    videoThumbnail: '/images/balenciaga-LQ.mp4', // Lower quality video for gallery
    category: 'Video',
    client: 'Concept',
    interaction: 'lightbox',
    content: '',
    tags: [],
    date: '2022-07-08',
    featured: false
  },
  {
    id: 'video-dieyoung',
    title: 'Music Video VFX & Post Production',
    video: [
      '/images/dieyoung-HQ.mp4'
    ], // Full quality video for lightbox
    videoThumbnail: '/images/dieyoung-LQ.mp4', // Lower quality video for gallery
    category: 'Video',
    client: 'Client',
    interaction: 'lightbox',
    content: '',
    tags: [],
    date: '2023-10-06',
    featured: false
  }
];

// Helper functions
export const getFeaturedProjects = () => {
  return projects
    .filter(project => project.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getProjectsByCategory = (category: ProjectCategory) => {
  const filteredProjects = category === 'All' 
    ? projects 
    : projects.filter(project => project.category === category);
  
  return filteredProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id);
}; 