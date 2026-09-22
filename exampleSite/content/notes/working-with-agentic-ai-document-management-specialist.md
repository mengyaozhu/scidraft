+++
title = "Working with Agentic AI: Document Management Specialist"
date = 2026-09-20
occupationTitle = "Document Management Specialist"
occupationCategory = "IT & Architecture"
alternativeTitles = ["Enterprise Content Management Specialist", "Document Control Specialist", "Information Management Specialist", "DMS Administrator"]
shortDescription = "Implements, configures, and administers enterprise document management systems to optimize how organizations capture, classify, secure, retrieve, and govern digital information throughout its lifecycle."
math = true
tags = ["AI and Jobs", "Human Skills", "Agentic Skills", "Working with Agentic AI", "Document Management Specialist"]

# showTitle = false

+++

# 1. Working with Agentic AI: Document Management Specialist

How human skills and agentic skills are dynamically integrated and coordinated across document management responsibilities

## 1.1. Document Management Specialist as an Occupation

{{< preview >}}

A document management specialist implements, configures, and administers enterprise-wide document management systems (DMS) and related procedures that allow organizations to capture, store, retrieve, share, and govern electronic content. This occupation connects information technology, business operations, and information governance by transforming chaotic, decentralized file shares into structured, secure, and highly searchable digital repositories. While a technical writer creates document content and a records manager defines long-term legal retention schedules, the document management specialist focuses on the active system architecture, metadata taxonomies, workflow automation, and daily operational efficiency of the enterprise content management (ECM) environment. To ensure that digital information remains accessible, secure, and compliant, the specialist must understand how business workflows, metadata standards, access control models, system integrations, and user behaviors collectively determine the viability and security of the organization's information ecosystem.

Typical responsibilities of a document management specialist include:
* DMS platform administration and system configuration;
* information architecture and metadata taxonomy design;
* workflow automation and process optimization;
* security, access control, and information governance enforcement;
* system integration, migration, and data quality management; and
* user training, support, and adoption strategy.

{{< /preview >}}

These responsibilities are fulfilled through distinct tasks and subtasks, each requiring one or more actions with specific skill requirements. Human skills and agentic skills both contribute to these responsibilities, but their levels and forms of involvement differ according to the responsibility, task, action, data, technical environment, and expected outcome.

{{< promotion-textual
     sponsored=true
title="Create a Resume That Gets You Noticed"
subtitle="Polished, customizable templates for job seekers."
buttonText="Explore Resume Templates"
buttonLink="https://www.resumetemplates.nl/" >}}


\textbf{SCoT (Structured Chain-of-Thought)} \cite{Sultan2024-rc} prompt is a method where the overall task of generating a document-grounded conversation is deliberately divided into a sequence of smaller, more manageable sub-tasks. For each of these sub-tasks, the researchers manually create text-based prompts that include specific instructions and a few examples (few-shot) to show the language model exactly what is expected. In practice, this means before the model writes a final answer, it first goes through guided steps: one prompt asks it to determine if the user's question can actually be answered from the given document (answerability classification), and another prompt asks it to identify the specific sentences within the document that contain the relevant information (sentence selection). Only after these steps are completed does a final prompt guide the model to generate the response, now equipped with a clear understanding of whether an answer exists and where it is located. This structured, step-by-step approach is designed to prevent the model from skipping ahead and making up information, instead forcing it to follow a logical and verifiable reasoning path. The principal evidence for its effectiveness is that the SCoT method, when including the answerability classification and sentence selection states with a FLAN-UL2-20B \cite{Tay2022-zb} assistant model, increased the agent's faithfulness to the source document by up to 16.8\% compared to a simpler method that generated the conversation in one step, as measured by lexical precision and factual consistency checks.  



The \textbf{CoF-CoT (Coarse-to-Fine Chain-of-Thought)} \cite{Nguyen2023-bh} method is a manually-crafted, text-based prompt approach designed to improve how large language models handle complex language understanding tasks. Instead of asking the model to produce an answer in one go, CoF-CoT breaks the overall task into a specific sequence of five smaller, more manageable steps that progress from broad, sentence-level understanding to precise, word-level details. As detailed in Section 3 of the paper, these steps are: 1) generating an Abstract Meaning Representation \cite{Banarescu2013-at} (AMR) graph, which captures the core concepts and relationships in the sentence; 2) predicting the overall intent of the utterance; 3) identifying the key phrases or slot values; 4) assigning a type to each of those key phrases from a given vocabulary; and finally 5) assembling everything into a final structured output called a Logic Form. A key feature of this method is that the prompt for each step explicitly includes the outputs generated from all previous steps, a process called conditioning, which ensures the later, finer-grained decisions are informed by the earlier, broader understanding. For example, the model uses the AMR graph and predicted intent from the first two steps to help it identify the correct slot values in step three. The primary evidence for its effectiveness is presented in Table 1, where CoF-CoT consistently outperforms all other prompt methods across multiple metrics. For instance, on the MTOP \cite{Li2021-fw} dataset in a zero-shot setting, CoF-CoT achieved 57.67\% intent accuracy, a substantial improvement over the next best method's 45.67\% (Least-to-Most \cite{Zhou2022-lm}). Similarly, on the MASSIVE dataset \cite{FitzGerald2023-xh} under the same conditions, it reached 89.00\% intent accuracy, significantly higher than the 73.66\% achieved by the best baseline method, Complex CoT \cite{Fu2023-av}.


\textbf{TSGP (Two-Stage Generative Prompting)} \cite{Sun2022-fr} is a framework designed to answer commonsense questions without any training on labeled data. It operates in two distinct stages, both driven by manually-crafted text prompts. In the first stage, called Knowledge Generation, the researchers feed a pre-trained language model a prompt that includes a simple instruction, such as ``Generate some knowledge about the concepts in the input,'' followed by a few handwritten examples (few-shot demonstrations) of questions paired with helpful knowledge statements. When a new question is inserted into this prompt, the model generates several pieces of commonsense knowledge related to that question, making the implicit information stored in its parameters explicit. Because this generated knowledge can sometimes be noisy or unhelpful, the framework then selects the single most relevant piece by calculating its pointwise mutual information with the original question. In the second stage, called Answer Generation, the framework uses another manually-crafted prompt. This prompt contains instructions, the selected knowledge statement from the first stage, the original question, and more few-shot demonstrations showing how to derive answers from knowledge. The language model then generates numerous possible answers, or pseudo-answers, based on this combined context. Finally, to predict the correct answer from the given choices, the framework computes the semantic similarity between each of the generated pseudo-answers and each provided answer option, using a separate sentence-embedding model, and votes for the option with the highest overall similarity. The principal evidence supporting this framework's effectiveness comes from its performance on three different commonsense reasoning benchmarks. On the CommonsenseQA \cite{Talmor2019-hl} dataset, TSGP achieved 49.1\% accuracy using the GPT2-XL model, which is a substantial 16.8\% improvement over the baseline model that simply scored answer options without any prompt. It also outperformed the previous best unsupervised method, SEQA \cite{Niu2021-ed}, by 14.3\%. On OpenBookQA \cite{Banerjee2019-pp}, TSGP reached 44.4\% accuracy, beating the baseline by 21.6\% and SEQA by 11.0\%. On SocialIQA \cite{Sap2019-an}, it achieved 51.5\% accuracy, outperforming the baseline by 8.7\% and SEQAA by 4.0\%. These consistent improvements across diverse tasks demonstrate that by using structured prompts to make implicit knowledge explicit, the TSGP framework enables language models to perform unsupervised commonsense reasoning more effectively without any fine-tuning.

## 1.2. Human Skills and Agentic Skills in Document Management

Document management increasingly integrates both human skills and agentic skills.

Human skills are reusable capabilities possessed and developed by document management specialists. They include information governance reasoning, taxonomy design, workflow logic formulation, security judgment, user empathy, change management, system architecture evaluation, and complex problem-solving.

Agentic skills are reusable capabilities available to AI agents through their underlying models, contextual information, instructions, constraints, tools, and computational resources. In document management, these skills include optical character recognition (OCR) and natural language processing (NLP) for metadata extraction, automated document classification, API script generation, access log monitoring, bulk file migration execution, deduplication scanning, and training documentation drafting.

Both skill types contribute to the same occupational responsibilities, but their involvement varies by action. Understanding the nuanced business context required to design a logical metadata taxonomy for cross-departmental contracts relies primarily on human knowledge of organizational structure and retrieval behaviors; an AI agent may then use agentic skills to scan thousands of legacy filenames, extract common keywords, and propose an initial metadata schema. In system security, the specialist first determines the ethical and operational boundaries for confidential workspaces, and an AI agent subsequently audits permission matrices to detect unauthorized access drifts. Across these actions, human and agentic skills are activated sequentially or iteratively based on task requirements, with the human professional maintaining oversight and final judgment.

The relationship between these skills is not a fixed division where certain responsibilities permanently belong to humans and others to AI. Instead, human and agentic involvement shifts across tasks and between different actions within the same task.

## 1.3. Dynamic Human–Agentic Skill Integration and Collaboration in Document Management

Document management functions can be understood as an occupation where responsibilities are fulfilled through tasks and subtasks, tasks and subtasks are executed through actions, and actions require appropriate configurations of human and agentic skills.

An occupation provides the overall professional context. For document management, this context encompasses administering content repositories, designing information architectures, automating document lifecycles, enforcing security protocols, and driving user adoption of enterprise systems.

A responsibility represents an expected area of professional work or an outcome that the document management specialist accomplishes or maintains. Responsibilities such as platform administration, taxonomy design, workflow automation, and user support each contain multiple tasks.

A task is a context-dependent unit of work used to fulfill part or all of a responsibility. When a task is too broad or complex for reliable execution, it is decomposed into smaller subtasks.

Tasks and subtasks are executed through one or more actions. Actions represent reusable and configurable operations such as configuring a new workspace template, writing a script to extract metadata from PDFs, mapping a document approval route, auditing user access rights, migrating a batch of legacy files, or generating a user adoption report.

Each action has skill requirements. These requirements describe the capabilities needed for effective and reliable execution. Depending on the action and its context, human skills, agentic skills, or an integration of both can satisfy these requirements.

The skills available for document management reside in a skill space containing both human skills and agentic skills. Relevant skills in this space can serve as candidate skills for executing the actions required by a particular task. A human skill in workflow logic formulation, for example, can serve as a candidate for designing a multi-stage contract approval process, while an agentic skill in automated notification routing can serve as a candidate for executing the email alerts associated with that process.

Candidate skills are evaluated relative to the requirements of the action and its occupational and task context. Appropriate skills are then selected and organized into a skill configuration for execution. Depending on these requirements, a configuration may rely mainly on human skills, mainly on agentic skills, or on an integrated arrangement of both.

### 1.3.1. Skills Competition and Skills Collaboration

Two important relationships can occur between human skills and agentic skills when constructing a skill configuration: skills competition and skills collaboration.

Skills competition occurs when both a human skill and an agentic skill can satisfy the same or similar requirements for an action, but simultaneous application of both is unnecessary. Under a particular occupational and task context, one skill type can provide a better fit for the action than the other.

For example, both a document management specialist and an AI agent can generate a summary of system storage utilization and inactive file volumes. When the reporting parameters and database queries are clearly specified, the agentic skill provides fast and scalable execution. When the summary requires interpreting whether a sudden spike in storage is due to an unauthorized bulk upload or a legitimate, temporary project archive, the specialist's human skills provide the necessary operational context and investigative judgment.

The purpose of skills competition is not to establish whether human or agentic skills are generally superior. Rather, it identifies which available skill provides the better fit for a particular action under particular conditions.

Skills collaboration occurs when one skill type alone cannot effectively satisfy the requirements of a task or its actions, or when combining complementary human and agentic skills produces stronger task performance.

Collaboration does not require human and agentic skills to operate simultaneously. Instead, they are activated at different stages of action execution in a sequential, iterative, or recursive manner according to evolving task requirements.

For example, a specialist first identifies that users are consistently bypassing the official DMS and storing sensitive contracts on local drives. The specialist determines the underlying friction points in the current upload process and designs a simplified, automated metadata capture workflow. An AI agent then writes the API integration scripts to connect the DMS with the organization's email client, configures the automated classification rules, and generates the testing protocols. The specialist subsequently reviews the test results, identifies an edge case where encrypted attachments fail to index correctly, and revises the system constraints. Finally, the agent deploys the updated configuration and drafts the user communication announcing the new feature. Throughout this sequence, human and agentic skills are activated iteratively as task requirements evolve, while the specialist directs the optimization and evaluates its outcomes.

This dynamic relationship allows document management specialists to leverage the complementary strengths of both skill types rather than relying on a permanent allocation of work.


{{< promotion-visual sponsored=true >}}

## 1.4. Essential Responsibilities of Document Management Specialist

### 1.4.1. DMS Platform Administration and System Configuration

DMS platform administration and system configuration establishes and maintains the core technical environment required for enterprise content management. This responsibility includes managing cloud or on-premise system environments, configuring global settings, overseeing system upgrades, developing REST API scripts for backend administration, and coordinating with vendors to resolve complex technical issues.

Agentic skills contribute extensively to system log parsing, automated regression testing for new releases, API script generation, and continuous monitoring of cloud service health. Human skills remain essential for evaluating the operational impact of system upgrades, designing the overarching workspace architecture, negotiating feature requests with software vendors, and determining the acceptable balance between system performance and security constraints.

For example, the enterprise DMS vendor announces a major platform upgrade that alters how background search indexing operates. An AI agent analyzes the release notes, generates a sandbox testing script, and monitors the sandbox environment for indexing latency spikes. The document management specialist reviews the agent's performance logs and determines that the new indexing method will severely degrade search speeds for the organization's massive historical archive. The specialist formulates a phased rollout strategy, instructs the agent to write the configuration scripts that throttle indexing during off-hours, and coordinates the deployment schedule with the IT infrastructure team.

| Human skills|Agentic skills|Integrated collaboration|
| ---|---|---|
| system architecture evaluation, vendor negotiation, impact assessment, deployment governance|log parsing, regression testing, API scripting, health monitoring|The AI agent automates environment monitoring and script generation, while the specialist evaluates system impacts and governs the deployment strategy.|


### 1.4.6. User Training, Support, and Adoption Strategy

User training, support, and adoption strategy ensures that the organization effectively utilizes the DMS and that users understand how to manage their digital content responsibly. This responsibility involves developing training materials, conducting workshops, analyzing system usage metrics to identify adoption barriers, managing a support ticketing queue, and driving continuous improvement based on user feedback.

Agentic skills assist with drafting user manuals from system configurations, analyzing helpdesk tickets to identify recurring user errors, generating interactive training modules, and providing first-tier chatbot support for common password or workspace access issues. Human skills evaluate the clarity of the training materials for non-technical audiences, design change-management strategies to overcome user resistance, and resolve complex, multi-step support escalations that require deep system troubleshooting.

For example, usage metrics indicate that a specific department is consistently failing to use the mandatory document check-out/check-in feature, leading to version control conflicts. An AI agent analyzes the department's support tickets and identifies that users are confused by the terminology used in the system's warning prompts. The specialist reviews the agent's findings and realizes the technical jargon is alienating the users. The specialist rewrites the system's custom warning messages into plain business language, instructs the agent to update the user interface text via the administration console, and hosts a brief, targeted refresher workshop for the department.

| Human skills|Agentic skills|Integrated collaboration|
| ---|---|---|
| change management, user empathy, complex escalation resolution, training design|manual drafting, ticket analysis, chatbot support, usage metric reporting|The AI agent analyzes support trends and drafts baseline documentation, while the specialist designs empathetic change-management strategies and resolves complex user friction points.|

## 1.5. Changing Human and Agentic Involvement Across Document Management Responsibilities

Human skills and agentic skills are involved throughout document management, but their relative involvement differs across responsibilities and changes during task execution.

| Responsibility|Typical human involvement|Typical agentic involvement|Typical integration|
| ---|---|---|---|
| DMS platform administration and system configuration|Very high|High|Agentic log parsing and regression testing combined with human system architecture evaluation and deployment governance.|
| Information architecture and metadata taxonomy design|Very high|Very high|Agentic NLP classification and bulk tagging governed by human taxonomy design and user behavior analysis.|
| Workflow automation and process optimization|Very high|High|Agentic workflow scripting and notification routing supporting human process mapping and bottleneck resolution.|
| Security, access control, and information governance enforcement|Very high|Very high|Agentic permission auditing and anomaly detection governed by human security policy definition and breach investigation.|
| System integration, migration, and data quality management|High|Very high|Agentic ETL scripting and deduplication combined with human data mapping logic and migration risk management.|
| User training, support, and adoption strategy|Very high|High|Agentic ticket analysis and manual drafting combined with human change management and user empathy.|

These involvement levels are not permanent allocations. A single responsibility may contain actions where human and agentic skills compete as alternative capabilities and other actions where they collaborate sequentially, iteratively, or recursively.

The practical objective is to construct skill configurations that use the most suitable available capabilities for each part of the work and revise those configurations when task performance evaluation shows that another arrangement performs more effectively or reliably.

## 1.6. Working as a Document Management Specialist with Agentic AI

Agentic AI is becoming an increasingly powerful component of document management. Document management specialists should therefore adopt and integrate AI agents as complementary participants in professional workflows rather than treating them only as occasional tools for writing API scripts, scanning access logs, or drafting user manuals.

This shift does not reduce the importance of information governance, system architecture, and user-centric design expertise. Human professionals remain responsible for the occupation and its corresponding responsibilities. They understand business workflows, define meaningful metadata taxonomies, interpret security constraints, determine appropriate access controls, evaluate system integrations, communicate with diverse stakeholders, control consequential data migrations, evaluate task performance, and decide how human and agentic skills are configured and improved.

At the same time, agentic skills greatly expand the volume and complexity of information management work that can be executed. AI agents process millions of files for metadata extraction, generate and test complex workflow scripts, monitor vast permission matrices for security drift, execute deduplication algorithms, draft extensive training documentation, and synthesize system usage metrics at a scale difficult to achieve through direct human effort alone.

Strong document management practice is therefore not based on maximizing human work or agentic work independently. It is based on finding appropriate configurations of human skills and agentic skills for the responsibilities, tasks, subtasks, and actions being performed.

Where a human skill and an agentic skill can independently perform the same action, skills competition identifies which is better suited to the current context. Where work requires complementary capabilities, skills collaboration results in human and agentic skills being activated sequentially, iteratively, or recursively to achieve stronger task performance than either skill type achieves alone.

Task performance evaluation then determines whether selected skills and configurations satisfy predefined expectations. Successful skills are retained and reused, while inadequate skills are refined, reconfigured, or newly developed. The resulting capabilities return to an increasingly useful skill space that supports document management and, where capabilities are reusable, other occupations as well.

For a document management specialist, working effectively with agentic AI means treating AI as a powerful complementary capability integrated into everyday professional routines while maintaining human control of occupational responsibilities. Through appropriate skill selection, competition, collaboration, evaluation, and continuous improvement, human professionals and agentic AI work together to achieve document management ecosystems that are more efficient, scalable, secure, adaptable, and fundamentally aligned with organizational knowledge strategies.

## References 

{{< references bib="bib/refs.bib" >}}

