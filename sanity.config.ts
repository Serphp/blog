import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'blogserph',

  projectId: 'bip4b9dx',
  dataset: 'serphnotes',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
