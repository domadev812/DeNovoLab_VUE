module.exports = {
  landing_pages: [
    { id: 1, text: 'Configuration' },
    { id: 2, text: 'Finance' },
    { id: 3, text: 'Log' },
    { id: 4, text: 'Management' },
    { id: 5, text: 'Monitoring' },
    { id: 6, text: 'Origination' },
    { id: 7, text: 'Routing' },
    { id: 8, text: 'Statistics' },
    { id: 9, text: 'Switch' },
    { id: 10, text: 'Template' },
    { id: 11, text: 'Agent' },
    { id: 12, text: 'Tools' }
  ],
  landing_pages_options: {
    configuration: [
      { id: 1, text: 'Carrier Group' },
      { id: 2, text: 'Carrier Portal CDR Fields' },
      { id: 3, text: 'CDR Generation Format' },
      { id: 4, text: 'Default Fail-over Rule' },
      { id: 5, text: 'FTP Configuration' },
      { id: 6, text: 'Global Route Error' },
      { id: 7, text: 'Invoice Setting' },
      { id: 8, text: 'Login Page Content' },
      { id: 9, text: 'Mail Sender' },
      { id: 10, text: 'Mail Template' },
      { id: 11, text: 'Payment Setting' },
      { id: 12, text: 'Roles' },
      { id: 13, text: 'System Modules' },
      { id: 14, text: 'System Setting' },
      { id: 15, text: 'Trunk Group' },
      { id: 16, text: 'User Management' },
      { id: 17, text: 'Verify Configuration' }
    ],
    finance: [
      { id: 1, text: 'Actual Transaction' },
      { id: 2, text: 'Auto Invoice Management' },
      { id: 3, text: 'Carrier Invoice History' },
      { id: 4, text: 'Invoices' },
      { id: 5, text: 'Invoice Notification Log' },
      { id: 6, text: 'Mutual Transaction' },
      { id: 7, text: 'Past Due Notification Log' },
      { id: 8, text: 'Past Due Summary' },
      { id: 9, text: 'Payment' },
      { id: 10, text: 'Regenerate Balance' }
    ],
    log: [
      // { id: 1, text: 'Authorization Log' },
      { id: 2, text: 'Auto Payment Log' },
      // { id: 3, text: 'Balance Log' },
      // { id: 4, text: 'Credit Log' },
      { id: 5, text: 'Email Log' },
      { id: 6, text: 'Export Log' },
      { id: 7, text: 'FTP Log' },
      // { id: 8, text: 'FTP Server Log' },
      { id: 9, text: 'Import Log' },
      // { id: 10, text: 'Invoice CDR Log' },
      { id: 11, text: 'Invoice Log' },
      // { id: 12, text: 'IP Modify Log' },
      // { id: 13, text: 'License Modification Log' },
      { id: 14, text: 'Modification Log' },
      // { id: 15, text: 'Origination Log' },
      { id: 16, text: 'Rate Import Log' },
      { id: 17, text: 'Rate Mass Edit Log' },
      { id: 18, text: 'Retrieve Password Log' },
      // { id: 19, text: 'Scheduled Report Log' },
      // { id: 20, text: 'Scheduler Log' },
      { id: 21, text: 'SIP Register' },
      // { id: 22, text: 'SQL Log' },
      { id: 23, text: 'User Sign In History' }
    ],
    management: [
      { id: 1, text: 'Carrier' },
      { id: 2, text: 'Client Rate Summary' },
      { id: 3, text: 'Credit Management' },
      { id: 4, text: 'Products' },
      { id: 5, text: 'Registration' },
      { id: 6, text: 'Unclaimed Trunks' },
      { id: 7, text: 'Wizard' }
    ],
    monitoring: [
      // { id: 1, text: 'Blackhole IP' },
      // { id: 2, text: 'Dialer Detection' },
      { id: 3, text: 'Fraud Detection' },
      { id: 4, text: 'Loop Detection' },
      { id: 5, text: 'Rule' },
      // { id: 6, text: 'Traffic Alert Rule' }
    ],
    origination: [
      { id: 1, text: 'Billing Rule' },
      { id: 2, text: 'Clients' },
      { id: 3, text: 'DID Repository' },
      { id: 4, text: 'Origination Static Routing' },
      { id: 5, text: 'Vendors' },
      { id: 6, text: 'Wizard' }
    ],
    routing: [
      { id: 1, text: 'Block List' },
      { id: 2, text: 'Digital Translation' },
      { id: 3, text: 'Dynamic Routing' },
      { id: 4, text: 'Routing Plan' },
      { id: 5, text: 'Static Routing' },
      { id: 6, text: 'Trunks' },
      { id: 7, text: 'Wizard' }
    ],
    statistics: [
      { id: 1, text: 'Active Call Report' },
      { id: 2, text: 'Active Registration' },
      { id: 3, text: 'CDRs List' },
      { id: 4, text: 'Daily Channel Usage Report' },
      { id: 5, text: 'Daily Usage Detail Report' },
      { id: 6, text: 'Dashboard' },
      { id: 7, text: 'Disconnect Causes' },
      { id: 8, text: 'Host Based Report' },
      { id: 9, text: 'Inbound/Outbound Report' },
      { id: 10, text: 'LNP Dip Record' },
      { id: 11, text: 'Location Report' },
      { id: 12, text: 'Profitability Analysis' },
      { id: 13, text: 'QoS Summary' },
      { id: 14, text: 'Spam Report' },
      { id: 15, text: 'Summary Report' },
      { id: 16, text: 'Usage Report' }
    ],
    switch: [
      { id: 1, text: 'Capacity' },
      { id: 2, text: 'Code Deck' },
      // { id: 3, text: 'Currency' },
      { id: 4, text: 'US Jurisdiction' },
      { id: 5, text: 'Payment Term' },
      { id: 6, text: 'Random ANI Group' },
      { id: 7, text: 'Rate Table' },
      { id: 8, text: 'Time Profile' },
      { id: 9, text: 'VoIP Gateway' }
    ],
    template: [
      { id: 1, text: 'Carrier Template' },
      { id: 2, text: 'Egress Trunk Template' },
      { id: 3, text: 'Ingress Trunk Template' },
      // { id: 4, text: 'Rate Email Template' },
      { id: 4, text: 'Rate Upload Template' }
    ],
    agent: [
      { id: 1, text: 'Agent Management' },
      { id: 2, text: 'Commission History' },
      { id: 3, text: 'Commission Report' }
    ],
    tools: [
      // { id: 1, text: 'Auto Rate Upload' },
      { id: 1, text: 'Call Simulation' },
      // { id: 3, text: 'CDR Reconciliation' },
      // { id: 4, text: 'LCR Generation' },
      { id: 2, text: 'Rate Generation' },
      { id: 3, text: 'Rerate' },
      { id: 4, text: 'SIP Packet Search' }
    ]
  }
}
