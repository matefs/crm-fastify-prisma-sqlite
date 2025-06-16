export function addOrgFilter(query: any, orgId: number) {
  if (query.where) query.where["orgId"] = orgId;
  else query.where = { orgId };
  return query;
}

