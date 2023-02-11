# contentful-astro

An integration inspired by Storyblok for astro for those using Contentful as their headless CMS and wish to map Content Models to their Astro components. I was trying to the Storyblok Astro integration that does this and absolutely loved it, so have built the same functionality for Contentful for those that use that platform.

## Installation

Install `contentful-astro`:

```bash
npm install contentful-astro
```

Add the following code to `astro.config.mjs` 

```js
import { defineConfig } from "astro/config";
import contentful from "contentful-astro";

export default defineConfig({
  integrations: [
    contentful({
      components: {
        // add your components here
      },
    }),
  ],
});
```

## How to set it up

Hopefully you will have created a component for each Content Model you have in Contentful. This configuration allows you to effectively register all your components so that when Contentful is rendering your page it has them all available to use.

Edit the config your added earlier to include each component by name and path (exlcuding the `src` part of the path):

```javascript
components: {
  page: "components/Page/Page",
  hero: "components/Hero/Hero"
},
```

This is just an example structure for a components location, but choose whatever the path is for where you store your components. As long as they exist inside the `src` folder they will be found.

Once you've registered your components in the `astro.config.mjs` file, you can use `<ContentfulComponent />` that comes with this package, to ensure that all your content will get correctly rendered from Contentful with their correlating component.

The example below shows a potential idea for looping through components and using the `<ContentfulComponent />` to render each one.

```html
---
import type { ContentType } from 'contentful';
import ContentfulComponent from 'contentful-astro/ContentfulComponent.astro';

const { components } = Astro.props;
---

<>
  {components?.map((comp: ContentType) => {
    return <ContentfulComponent type={comp.sys.contentType.sys.id} {...comp.fields} />
  })}
</>
```
