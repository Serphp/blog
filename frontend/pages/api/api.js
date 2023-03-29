import client from '../../lib/client'

export async function getSanityData() {
  // Realiza una consulta a Sanity para obtener los datos que deseas mostrar en tu aplicación
    const data = await client.fetch(`*[_type == "mi_tipo_de_documento"]`)
    return data
}