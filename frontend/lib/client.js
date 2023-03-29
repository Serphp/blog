import sanityClient from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url"; 

export const clientConfig = {
    projectId: 'bip4b9dx',
    dataset: 'serphnotes',
}

const client = sanityClient({
    projectId: clientConfig.projectId,
    dataset: clientConfig.dataset,
    apiVersion: '2022-10-11',
    token: "skRSkGHU8SyhatbA6EdnRPBuV6aygVscficP80VjxQRh6R7QyzYfmDddZsSmKZRFNGw0pTUZPFRbl7aunrcOzpYzn5UlkK3daIbtnDWYZopKMCQzADrY7VELcDRLOZ5Qs2qDOH3nTBr4f0HAOylRRNNYm2bz7mIqTtPANeg0qw3CofKytlNp",
    useCdn: false,
  // ignoreBrowserTokenWarning: true,
})

export { client };

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

