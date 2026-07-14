SELECT a.report_id,
rp.report_name,
a.state_id,
a.org_id, 
b.org_name as org_name,
a.assign_org,
c.org_name as assign_org_name,
a.prd_id,
a.end_date
FROM rp_input_grant a LEFT JOIN sys_organization b 
ON a.org_id = b.id 
LEFT JOIN sys_organization c 
ON a.assign_org = c.id 
LEFT JOIN rp_report rp 
ON a.report_id = rp.id 
WHERE lower(rp.report_name) = lower('Báo cáo quản lý hoạt động hóa chất (Sở Công Thương)')
and a.assign_org = 481864
and state_id = 1