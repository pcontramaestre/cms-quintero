import type { JsonApiResource, JsonApiResourceWithPath, JsonApiResponse } from 'next-drupal'

export interface DrupalNode extends JsonApiResourceWithPath {
    drupal_internal__nid: number
    drupal_internal__vid: number
    changed: string
    created: string
    title: string
    default_langcode: boolean
    sticky: boolean
  }

  export interface DrupalBlock extends JsonApiResource {
    info: string
  }

  export interface DrupalMedia extends JsonApiResource {
    drupal_internal__mid: string
    drupal_internal__vid: string
    changed: string
    created: string
    name: string
  }

  export interface DrupalFile extends JsonApiResource {
    drupal_internal__fid: string
    changed: string
    created: string
    filename: string
    uri: {
      value: string
      url: string
    }
    filesize: number
    filemime: string
    resourceIdObjMeta?: DrupalFileMeta
  }
  
  export interface DrupalFileMeta {
    alt?: string
    title?: string
    width: number
    height: number
  }

  export interface DescriptionTaxonomyTerm {
    value: string;
    format: string;
    processed: string;
  }
  export interface DrupalTaxonomyTerm extends JsonApiResourceWithPath {
    drupal_internal__tid: string
    changed: string
    default_langcode: boolean
    name: string
    description: DescriptionTaxonomyTerm
    weight: number
  }

  export interface DrupalUser extends JsonApiResourceWithPath {
    drupal_internal__uid: string
    changed: string
    created: string
    default_langcode: boolean
    name: string
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
export interface DrupalView<T = Record<string, any>[]> {
    id: string
    results: T
    meta: JsonApiResponse["meta"]
    links: JsonApiResponse["links"]
  }


  export interface DrupalParagraph extends JsonApiResource {
    drupal_internal__id: number
    drupal_internal__revision_id: number
  }

  export type DrupalPathAlias = {
    alias: string
    pid: number
    langcode: string
  }

  export interface DrupalMenuItem {
    description: string
    enabled: boolean
    expanded: boolean
    id: DrupalMenuItemId
    menu_name: string
    meta: Record<string, unknown>
    options: Record<string, unknown>
    parent: DrupalMenuItemId
    provider: string
    route: {
      name: string
      parameters: Record<string, unknown>
    }
    title: string
    type: string
    url: string
    weight: string
    items?: DrupalMenuItem[]
  }
  
  export type DrupalMenuItemId = string

  export interface DrupalTranslatedPath {
    resolved: string
    isHomePath: boolean
    entity: {
      canonical: string
      type: string
      bundle: string
      id: string
      uuid: string
      langcode?: string
    }
    label?: string
    jsonapi?: {
      individual: string
      resourceName: string
      pathPrefix: string
      basePath: string
      entryPoint: string
    }
    meta?: Record<string, unknown>
    redirect?: {
      from: string
      to: string
      status: string
    }[]
  }

  export interface DrupalSearchApiJsonApiResponse extends JsonApiResponse {
    meta: JsonApiResponse["meta"] & {
      facets?: DrupalSearchApiFacet[]
    }
  }
  
  export interface DrupalSearchApiFacet {
    id: string
    label?: string
    path?: string
    terms?: {
      url: string
      values: {
        value: string
        label: string
        active?: boolean
        count?: number
      }
    }[]
  }

  interface Article extends DrupalNode {
    field_foo: string
  }
    

  export interface AppointmentConnectionsResponse{
    title: string
    field_fechas_laborables: string
    service_name: string
    service_id: string
    service_price: string
    ids_locations: string
    names_locations: string
    locations: string
    provider: string
    type_provider: string
    email_provider: string
    service_time: string
    max_slots: string
  }