export function extractCatalogData(xmlJson) {
  if (!xmlJson || !xmlJson.Schema || !xmlJson.Schema.Envelope) {
    console.error("El JSON no tiene estructura OFDA válida.");
    return null;
  }

  const env = xmlJson.Schema.Envelope;
  const ent = env.Enterprise || {};

  const pick = (...keys) => {
    for (const key of keys) {
      const val = ent[key];
      if (val) return val;
    }
    return null;
  };

  return {
    Meta: {
      SchemaVersion: env?.["@attributes"]?.SchemaVersion || null,
      EnterpriseCode: ent?.Code?.["#text"] || null,
      EnterpriseName: ent?.Name?.["#text"] || null
    },

    PriceList: ent?.PriceList || null,

    Materials: pick("Material"),

    Parts: pick("Part", "PartDefinition", "PartDef"),

    Items: pick("CatalogItem", "CommercialItem", "Item", "Product"),

    Options: pick("Feature", "Option", "FeatureSet"),

    Geometry: pick("Symbol", "Geometry", "Graphic", "Symbol3D", "Symbol2D")
  };
}
