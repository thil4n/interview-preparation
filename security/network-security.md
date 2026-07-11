# What is the difference between IDS and IPS?

Answer:
• IDS (Intrusion Detection System) monitors traffic and alerts when suspicious activity is detected.
• IPS (Intrusion Prevention System) actively blocks or prevents those threats in real time.
• IDS is passive, IPS is inline and reactive.

# What is a firewall and how does it work?

Answer:
A firewall is a network security device or software that filters traffic based on pre-defined rules (e.g., IPs, ports, protocols).
It can be stateless (checks packets individually) or stateful (tracks connection state for context-aware filtering).

# Explain the TCP three-way handshake.

Answer: 1. SYN: Client sends a SYN to initiate a connection. 2. SYN-ACK: Server responds with SYN-ACK. 3. ACK: Client replies with ACK, establishing the connection.
This handshake is essential for reliable communication and is often targeted in SYN flood attacks.

# What is a SYN flood attack and how do you mitigate it?

Answer:
A SYN flood is a DoS attack where an attacker sends many SYN requests but doesn’t complete the handshake.
Mitigation:
• Use SYN cookies
• Configure firewalls to limit SYNs
• Deploy rate limiting or intrusion prevention systems

# What is a DMZ in network architecture?

Answer:
A DMZ (Demilitarized Zone) is a network segment that separates external-facing services (like web servers) from the internal network.
It reduces the risk to internal systems if the public-facing services are compromised.

# What is port scanning and how can it be detected?

Answer:
Port scanning is used to discover open ports and services on a target system.
Detection methods:
• Analyze logs for repeated connection attempts
• Use IDS tools like Snort
• Monitor for abnormal traffic patterns

# How does a VPN work?

Answer:
A VPN (Virtual Private Network) encrypts data traffic and tunnels it through a secure connection to a remote server.
It provides confidentiality, integrity, and authenticity, often using protocols like IPSec or SSL/TLS.

# What is MAC filtering? Is it secure?

Answer:
MAC filtering allows or denies devices based on their MAC addresses.
It’s a basic security measure but can be easily bypassed by MAC spoofing, so it’s not reliable as a primary control.

# What is ARP poisoning and how is it prevented?

Answer:
ARP poisoning is a type of Man-in-the-Middle attack where an attacker sends fake ARP messages to link their MAC with another IP (e.g., the gateway).
Prevention:
• Use static ARP entries
• Enable dynamic ARP inspection (DAI) on switches
• Use network segmentation

# What is the difference between TCP and UDP in security context?

Answer:
• TCP is connection-oriented, with error checking and reliability, making it easier to track sessions.
• UDP is connectionless, faster but lacks built-in security; used in attacks like UDP flood or amplification attacks (e.g., DNS reflection).

# What is the OSI model and why is it important in network security?

Answer:
The OSI model is a 7-layer framework (Physical → Application) used to understand network communications.
In security, it helps identify where threats occur and which layer is affected — e.g., Layer 3 (IP spoofing), Layer 4 (port scans), Layer 7 (SQLi, XSS).

# What is IP spoofing?

Answer:
IP spoofing is an attack where the attacker fakes the source IP address in packet headers to masquerade as a trusted source.
It’s used in DoS attacks, Man-in-the-Middle attacks, and bypassing firewalls.

# How does DNS work, and what are DNS-related attacks?

Answer:
DNS (Domain Name System) resolves domain names to IP addresses.
Common attacks:
• DNS Spoofing / Cache Poisoning
• DNS Tunneling (exfiltrate data via DNS queries)
• DNS Amplification (DDoS reflection attack)

# What is a VLAN and how does it enhance security?

Answer:
A VLAN (Virtual LAN) segments a physical network into isolated logical networks.
This limits broadcast domains and restricts lateral movement, making internal attacks harder.

# Explain network segmentation and its security benefits.

Answer:
Network segmentation involves splitting a network into zones (e.g., internal, DMZ, guest).
It:
• Limits lateral movement
• Contains breaches
• Improves access control
• Enables micro-segmentation in zero-trust models

# What are common indicators of a network intrusion?

Answer:
• Sudden traffic spikes
• Unusual port scanning
• Unauthorized login attempts
• Abnormal outbound connections
• SIEM alerts or IDS detections

# How does SSL/TLS protect data in transit?

Answer:
SSL/TLS uses asymmetric encryption for key exchange and symmetric encryption for the session, ensuring:
• Confidentiality (encrypted data)
• Integrity (via MACs)
• Authentication (via certificates)

# What are common Layer 2 attacks and how do you defend against them?

Answer:
• MAC flooding: Overwhelms switch MAC table – counter with port security.
• ARP spoofing: Poison ARP cache – defend with DAI or static ARP entries.
• STP manipulation: Attack switch topology – secure with BPDU Guard.

# How do proxy servers enhance network security?

Answer:
Proxies:
• Hide internal IPs
• Enforce content filtering
• Provide traffic logging
• Can terminate SSL connections for inspection (SSL interception)

# What’s the difference between inline and out-of-band security appliances?

Answer:
• Inline: Actively inspects and filters traffic (e.g., IPS, WAF).
• Out-of-band: Monitors traffic passively, often used for logging or alerting (e.g., IDS, SPAN port monitoring).

# Your company is experiencing a DDoS attack. What steps would you take to respond?

Answer: 1. Identify and confirm the DDoS using network monitoring and logs. 2. Rate-limit traffic or block source IPs (if applicable). 3. Engage ISP or cloud provider for mitigation (e.g., scrubbing service). 4. Use Web Application Firewall (WAF) and CDN for layer 7 protection. 5. Post-incident analysis to harden defenses and update playbooks.

# How would you secure a public-facing web application at the network level?

Answer:
• Place app servers in a DMZ.
• Use a reverse proxy and WAF.
• Apply strict firewall rules to limit traffic to ports 80/443.
• Use TLS with strong ciphers.
• Restrict access to the database using private subnets.
• Enable logging and monitoring for unusual activity.

# What’s the difference between symmetric and asymmetric encryption in network communication?

Answer:
• Symmetric: Same key for encryption and decryption (e.g., AES) — fast, used in data transfer.
• Asymmetric: Public/private key pair (e.g., RSA) — used for key exchange and authentication (e.g., TLS handshake).
• Most secure protocols use both (hybrid cryptosystems).

# How would you detect and prevent data exfiltration on a corporate network?

Answer:
• Deploy DLP (Data Loss Prevention) systems.
• Monitor for unusual outbound traffic, especially to unknown IPs or over DNS.
• Use firewalls and proxies to block suspicious uploads.
• Inspect SSL traffic using TLS decryption (where legally permitted).
• Implement network segmentation and least privilege access.

# What is a Zero Trust Network and how does it differ from traditional network security?

Answer:
Zero Trust assumes no implicit trust, even inside the network.
• Requires continuous authentication, micro-segmentation, and policy enforcement.
• Traditional security trusts internal traffic; Zero Trust validates every request.
• Implements least privilege and device/user verification.

# How would you secure remote employee connections to the internal network?

Answer:
• Use a VPN with MFA (Multi-Factor Authentication).
• Enforce endpoint security (e.g., antivirus, updates, disk encryption).
• Apply split tunneling policies carefully.
• Monitor connections with SIEM tools.
• Use device posture checks before allowing access.

# What are common misconfigurations in firewalls and routers that lead to vulnerabilities?

Answer:
• Open ports or overly permissive rules
• Lack of logging or alerts
• Allowing inbound traffic to internal IPs
• Default passwords or SNMP community strings
• No rule cleanup or least privilege applied

# How would you secure DNS in an enterprise environment?

Answer:
• Use internal recursive DNS servers for clients.
• Enable DNSSEC for integrity verification.
• Monitor for DNS tunneling or abuse.
• Apply split-horizon DNS to hide internal records from public.
• Use cloud-based DNS firewalls (like Cisco Umbrella) for threat filtering.

# A user reports slow internet. How do you investigate whether it’s a network security issue?

Answer:
• Check for malicious traffic (e.g., beaconing, exfiltration).
• Analyze bandwidth usage per IP.
• Inspect proxy and firewall logs.
• Scan for malware or unauthorized applications.
• Rule out DNS hijacking or MITM proxies.

# How do you ensure that sensitive data is secure during network transmission?

Answer:
• Use TLS 1.2+ for encrypted communications.
• Enforce HSTS on web servers.
• Avoid legacy protocols (e.g., FTP, Telnet).
• Apply VPNs or IPsec tunnels where needed.
• Ensure certificate validation and cipher suite hardening.
