import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import util from 'util';

const app = express();

// xampp folder
const uploadsPath = 'C:/xampp/htdocs/uploads';

if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

app.use('/uploads', express.static(uploadsPath));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "usams",
    multipleStatements: true
});

// Promisify the query method
const query = util.promisify(db.query).bind(db);

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database");
});

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsPath);
    },
    filename: function (req, file, cb) {
        // Use the original file name directly
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.json("Backend server connected.");
});

app.get("/organizations", (req, res) => {
    const q = "SELECT * FROM `organizations` ORDER BY `organizations`.`org_name` ASC";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching organizations:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/users", (req, res) => {
    const q = "SELECT * FROM `users`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/events", (req, res) => {
    const q = "SELECT * FROM `events`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching events:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/students", (req, res) => {
    const q = "SELECT * FROM `students`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/advisers", (req, res) => {
    const q = "SELECT * FROM `advisers`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching advisers:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/approvers", (req, res) => {
    const q = "SELECT * FROM `approvers`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching approvers:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/deans", (req, res) => {
    const q = "SELECT * FROM `deans`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching deans:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/schedacts", (req, res) => {
    const q = "SELECT * FROM `schedacts`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching scheduled acts:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/search-students", (req, res) => {
    const { name } = req.query;
    const q = "SELECT * FROM students WHERE stud_name LIKE ?";
    db.query(q, [`%${name}%`], (err, data) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/members", (req, res) => {
    const q = "SELECT * FROM `members`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching members:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/documentation_images", (req, res) => {
    const q = "SELECT * FROM `documentation_images`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching images:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/cbl", (req, res) => {
    const q = "SELECT * FROM `cbl`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching CBL:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/proposals", (req, res) => {
    const q = "SELECT * FROM `proposals`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching Proposals:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/programs", (req, res) => {
    const q = "SELECT * FROM `programs`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching Programs:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/budgets", (req, res) => {
    const q = "SELECT * FROM `budgets`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching Budgets:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/allocations", (req, res) => {
    const q = "SELECT * FROM `allocations`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching Allocations:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/participants", (req, res) => {
    const q = "SELECT * FROM `participants`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching participants:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/committees", (req, res) => {
    const q = "SELECT * FROM `committees`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching committees:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/actfee", (req, res) => {
    const q = "SELECT * FROM `actfee`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching Act Fee:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/comments", (req, res) => {
    const q = "SELECT * FROM `comments`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching Comments:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.post('/organizations/:org_id', upload.fields([
    { name: 'org_img', maxCount: 1 },
    { name: 'org_header', maxCount: 1 }
]), (req, res) => {
    const org_id = req.params.org_id;
    const { org_name, org_type, org_tag, org_desc } = req.body;

    let org_img = req.body.org_img;
    let org_header = req.body.org_header;

    if (req.files['org_img']) {
        org_img = req.files['org_img'][0].filename;
    }
    if (req.files['org_header']) {
        org_header = req.files['org_header'][0].filename;
    }

    const q = "UPDATE organizations SET org_name = ?, org_type = ?, org_tag = ?, org_desc = ?, org_img = ?, org_header = ? WHERE org_id = ?";
    const values = [org_name, org_type, org_tag, org_desc, org_img, org_header, org_id];

    db.query(q, values, (err, result) => {
        if (err) {
            console.error("Error updating organization:", err);
            return res.status(500).json({ error: "Failed to update organization" });
        }
        console.log("Organization updated:", result.affectedRows);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Organization not found" });
        }

        const selectQ = "SELECT * FROM organizations WHERE org_id = ?";
        db.query(selectQ, [org_id], (err, updatedOrg) => {
            if (err) {
                console.error("Error fetching updated organization:", err);
                return res.status(500).json({ error: "Failed to fetch updated organization" });
            }
            if (updatedOrg.length === 0) {
                return res.status(404).json({ error: "Updated organization not found" });
            }
            return res.json(updatedOrg[0]);
        });
    });
});

app.delete('/events/delete/:event_key', (req, res) => {
    const event_key = req.params.event_key;

    const q = "DELETE FROM events WHERE event_key = ?";
    db.query(q, [event_key], (err, result) => {
        if (err) {
            console.error("Error deleting event:", err);
            return res.status(500).json({ error: "Failed to delete event" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Event not found" });
        }
        console.log("Event deleted:", event_key);
        return res.json({ event_key });
    });
});

app.post('/events/edit/:event_key', upload.fields([
    { name: 'event_img', maxCount: 1 }
]), (req, res) => {
    const event_key = req.params.event_key;
    const { event_date, event_name, event_desc, event_type, eventSY } = req.body;

    let event_img = req.body.event_img;

    if (req.files['event_img']) {
        event_img = req.files['event_img'][0].filename;
    }

    const q = "UPDATE events SET event_date = ?, event_name = ?, event_desc = ?, event_type = ?, eventSY = ?, event_img = ? WHERE event_key = ?";
    const values = [event_date, event_name, event_desc, event_type, eventSY, event_img, event_key];

    db.query(q, values, (err, result) => {
        if (err) {
            console.error("Error updating event:", err);
            return res.status(500).json({ error: "Failed to update event" });
        }
        console.log("Event updated:", result.affectedRows);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        const selectQ = "SELECT * FROM events WHERE event_key = ?";
        db.query(selectQ, [event_key], (err, updatedEvent) => {
            if (err) {
                console.error("Error fetching updated event:", err);
                return res.status(500).json({ error: "Failed to fetch updated event" });
            }
            if (updatedEvent.length === 0) {
                return res.status(404).json({ error: "Updated event not found" });
            }
            return res.json(updatedEvent[0]);
        });
    });
});

app.post('/events/add', upload.fields([
    { name: 'event_img', maxCount: 1 }
]), (req, res) => {
    const { event_key, event_date, event_name, event_desc, event_type, eventSY, org_id } = req.body;
    let event_img = req.body.event_img;

    if (req.files['event_img']) {
        event_img = req.files['event_img'][0].filename;
    }

    const q = "INSERT INTO events (event_key, event_date, event_name, event_desc, event_type, eventSY, event_img, org_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [event_key, event_date, event_name, event_desc, event_type, eventSY, event_img, org_id];

    db.query(q, values, (err, result) => {
        if (err) {
            console.error("Error adding event:", err);
            return res.status(500).json({ error: "Failed to add event" });
        }
        console.log("Event added:", result.insertId);
        return res.json({ event_key: result.insertId, ...req.body, event_img });
    });
});

app.post('/members/edit/:member_id', (req, res) => {
    const { stud_id, org_id, sy_id, role } = req.body;
    const member_id = req.params.member_id;
  
    const q = "UPDATE members SET stud_id = ?, org_id = ?, sy_id = ?, role = ? WHERE member_id = ?";
    const values = [stud_id, org_id, sy_id, role, member_id];
  
    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Error updating member:", err);
        return res.status(500).json({ error: "Failed to update member" });
      }
      console.log("Member updated:", result.affectedRows);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Member not found" });
      }
  
      const selectQ = "SELECT * FROM members WHERE member_id = ?";
      db.query(selectQ, [member_id], (err, updatedMember) => {
        if (err) {
          console.error("Error fetching updated member:", err);
          return res.status(500).json({ error: "Failed to fetch updated member" });
        }
        if (updatedMember.length === 0) {
          return res.status(404).json({ error: "Updated member not found" });
        }
        return res.json(updatedMember[0]);
      });
    });
  });
  
  app.post('/members/delete/:member_id', (req, res) => {
    const member_id = req.params.member_id;
  
    const q = "DELETE FROM members WHERE member_id = ?";
    const values = [member_id];
  
    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Error deleting member:", err);
        return res.status(500).json({ error: "Failed to delete member" });
      }
      console.log("Member deleted:", result.affectedRows);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Member not found" });
      }
      return res.json({ message: "Member deleted successfully" });
    });
  });
  
  app.post('/members/add', async (req, res) => {
    const { stud_id, org_id, sy_id, role } = req.body;

    const memberIdQuery = 'SELECT MAX(CAST(SUBSTRING(pros_key, 6) AS UNSIGNED)) AS max_pros_key FROM members';
    const memberIdResult = await query(memberIdQuery);
    const maxMemberId = memberIdResult[0].max_member_id || 0;
    const finalMemberId = `mem_${maxMemberId + 1}`;

    const q = "INSERT INTO members (member_id, stud_id, org_id, sy_id, role) VALUES (?, ?, ?, ?, ?)";
    const values = [finalMemberId, stud_id, org_id, sy_id, role];
  
    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Error adding member:", err);
        return res.status(500).json({ error: "Failed to add member" });
      }
      console.log("Member added:", result.insertId);
      return res.json({ member_id: result.insertId, ...req.body});
    });
  });

app.post('/proposals/incampus/add', upload.fields([]), async (req, res) => {
    const {
      pros_nature, org_id, pros_proponent, pros_title, pros_date, pros_venue,
      pros_objectives, pros_rationale, pros_participants,
      selected_sdg, alignment_explanation,
      objective1_title, objective1_explanation, objective2_title, objective2_explanation,
      objective3_title, objective3_explanation, ilo1, ilo2, ilo3, house_rules,
      programs, budgetSources, budgetAllocations, participants, committees,
      allMembersNote // Add allMembersNote to the destructured object
    } = req.body;
  
    try {
      // Generate pros_key
      const prosKeyQuery = 'SELECT MAX(CAST(SUBSTRING(pros_key, 6) AS UNSIGNED)) AS max_pros_key FROM proposals';
      const prosKeyResult = await query(prosKeyQuery);
      const maxProsKey = prosKeyResult[0].max_pros_key || 0;
      const finalProsKey = `pros_${maxProsKey + 1}`;
  
      // Log the received data for debugging
      console.log("Received data:", req.body);
  
      // Ensure that alignment_explanation is a string
      const alignmentExplanationStr = alignment_explanation.toString();
  
      // Find the active school year
      const activeSchoolYearQuery = 'SELECT sy_id FROM schoolyear WHERE isActive = 1';
      const activeSchoolYearResult = await query(activeSchoolYearQuery);
      const sy_id = activeSchoolYearResult[0].sy_id;
  
      const proposalQuery = `
        INSERT INTO proposals (
          pros_key, org_id, pros_type, pros_nature, pros_proponent, pros_title, pros_date, pros_venue,
          pros_objectives, pros_rationale, pros_participants,
          actfee_proposed, actfee_expense, actfee_collection, selected_sdg, alignment_explanation,
          objective1_title, objective1_explanation, objective2_title, objective2_explanation,
          objective3_title, objective3_explanation, ilo1, ilo2, ilo3, house_rules, sy_id,
          date_created, step_at, status, on_revision, note
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      const proposalValues = [
        finalProsKey, org_id, 'In Campus', pros_nature, pros_proponent, pros_title, pros_date, pros_venue,
        pros_objectives, pros_rationale, pros_participants,
        null, null, null,
        selected_sdg, alignmentExplanationStr,
        objective1_title, objective1_explanation, objective2_title, objective2_explanation,
        objective3_title, objective3_explanation, ilo1, ilo2, ilo3, house_rules, sy_id,
        new Date(), 1, 'Pending Approval of Adviser', false,
        allMembersNote // Add allMembersNote to the values array
      ];
  
      // Log the values being inserted for debugging
      console.log("Values being inserted:", proposalValues);
  
      const proposalResult = await query(proposalQuery, proposalValues);
      console.log("Proposal added:", proposalResult.insertId);
  
      // Fetch existing program keys to determine the next available key
      const existingProgKeysQuery = 'SELECT prog_key FROM programs';
      const existingProgKeysResult = await query(existingProgKeysQuery);
      const existingProgKeys = existingProgKeysResult.map(row => parseInt(row.prog_key.split('_')[1], 10));
      const maxExistingProgKey = existingProgKeys.length > 0 ? Math.max(...existingProgKeys) : 0;
  
      // Fetch existing budget keys to determine the next available key
      const existingBudgetKeysQuery = 'SELECT budget_key FROM budgets';
      const existingBudgetKeysResult = await query(existingBudgetKeysQuery);
      const existingBudgetKeys = existingBudgetKeysResult.map(row => parseInt(row.budget_key.split('_')[1], 10));
      const maxExistingBudgetKey = existingBudgetKeys.length > 0 ? Math.max(...existingBudgetKeys) : 0;
  
      // Fetch existing allocation keys to determine the next available key
      const existingAllocKeysQuery = 'SELECT allocation_key FROM allocations';
      const existingAllocKeysResult = await query(existingAllocKeysQuery);
      const existingAllocKeys = existingAllocKeysResult.map(row => parseInt(row.allocation_key.split('_')[1], 10));
      const maxExistingAllocKey = existingAllocKeys.length > 0 ? Math.max(...existingAllocKeys) : 0;
  
      // Fetch existing participant keys to determine the next available key
      const existingPartKeysQuery = 'SELECT participant_id FROM participants';
      const existingPartKeysResult = await query(existingPartKeysQuery);
      const existingPartKeys = existingPartKeysResult.map(row => parseInt(row.participant_id.split('_')[1], 10));
      const maxExistingPartKey = existingPartKeys.length > 0 ? Math.max(...existingPartKeys) : 0;
  
      // Fetch existing committee keys to determine the next available key
      const existingCommKeysQuery = 'SELECT comm_key FROM committees';
      const existingCommKeysResult = await query(existingCommKeysQuery);
      const existingCommKeys = existingCommKeysResult.map(row => parseInt(row.comm_key.split('_')[1], 10));
      const maxExistingCommKey = existingCommKeys.length > 0 ? Math.max(...existingCommKeys) : 0;
  
      // Save programs
      if (programs && programs.length > 0) {
        const programQuery = "INSERT INTO programs (prog_key, pros_key, prog_title, prog_start, prog_end, prog_persons) VALUES ?";
        const programValues = JSON.parse(programs).map((program, index) => [
          `prog_${maxExistingProgKey + index + 1}`, finalProsKey, program.program_name, program.start_time, program.end_time, program.persons_involved
        ]);
        await query(programQuery, [programValues]);
        console.log("Programs added:", programValues.length);
      }
  
      // Save budget sources
      if (budgetSources && budgetSources.length > 0) {
        const budgetSourceQuery = "INSERT INTO budgets (budget_key, pros_key, budget_source, budget_particulars) VALUES ?";
        const budgetSourceValues = JSON.parse(budgetSources).map((source, index) => [
          `source_${maxExistingBudgetKey + index + 1}`, finalProsKey, source.source, source.particulars
        ]);
        await query(budgetSourceQuery, [budgetSourceValues]);
        console.log("Budget sources added:", budgetSourceValues.length);
      }
  
      // Save budget allocations
      if (budgetAllocations && budgetAllocations.length > 0) {
        const budgetAllocationQuery = "INSERT INTO allocations (allocation_key, pros_key, allocation_particulars, allocation_quantity, allocation_amount) VALUES ?";
        const budgetAllocationValues = JSON.parse(budgetAllocations).map((allocation, index) => [
          `alloc_${maxExistingAllocKey + index + 1}`, finalProsKey, allocation.particulars, allocation.quantity, allocation.amount
        ]);
        await query(budgetAllocationQuery, [budgetAllocationValues]);
        console.log("Budget allocations added:", budgetAllocationValues.length);
      }
  
      // Save participants
      if (participants && participants.length > 0) {
        const participantQuery = "INSERT INTO participants (participant_id, pros_key, stud_id, permit) VALUES ?";
        const participantValues = JSON.parse(participants).map((participant, index) => [
          `part_${maxExistingPartKey + index + 1}`, finalProsKey, participant.stud_id, null
        ]);
        await query(participantQuery, [participantValues]);
        console.log("Participants added:", participantValues.length);
      }
  
      // Save committees
      if (committees && committees.length > 0) {
        const commQuery = "INSERT INTO committees (comm_key, pros_key, comm_name, comm_members) VALUES ?";
        const commValues = JSON.parse(committees).map((comm, index) => [
          `comm_${maxExistingCommKey + index + 1}`, finalProsKey, comm.comm_name, comm.comm_members
        ]);
        await query(commQuery, [commValues]);
        console.log("Committees added:", commValues.length);
      }
  
      return res.json({ pros_key: finalProsKey, ...req.body });
    } catch (err) {
      console.error("Error adding proposal:", err);
      return res.status(500).json({ error: "Failed to add proposal" });
    }
  });  

app.post('/proposals/outcampus-a/add', upload.fields([]), async (req, res) => {
    const {
      pros_nature, org_id, pros_title, pros_rationale, selected_sdg,
      alignment_explanation, objective1_title, objective1_explanation,
      objective2_title, objective2_explanation, objective3_title,
      objective3_explanation, ilo1, ilo2, ilo3,
      actfee_proposed, actfee_expense, actfee_collection, house_rules,
      schedacts, actfees, participants
    } = req.body;

    try {
      // Generate pros_key
      const prosKeyQuery = 'SELECT MAX(CAST(SUBSTRING(pros_key, 6) AS UNSIGNED)) AS max_pros_key FROM proposals';
      const prosKeyResult = await query(prosKeyQuery);
      const maxProsKey = prosKeyResult[0].max_pros_key || 0;
      const finalProsKey = `pros_${maxProsKey + 1}`;

      // Log the received data for debugging
      console.log("Received data:", req.body);

      // Ensure that alignment_explanation is a string
      const alignmentExplanationStr = alignment_explanation.toString();

      // Find the active school year
      const activeSchoolYearQuery = 'SELECT sy_id FROM schoolyear WHERE isActive = 1';
      const activeSchoolYearResult = await query(activeSchoolYearQuery);
      const sy_id = activeSchoolYearResult[0].sy_id;

      const proposalQuery = `
        INSERT INTO proposals (
          pros_key, org_id, pros_type, pros_nature, pros_proponent, pros_title, pros_date, pros_venue,
          pros_objectives, pros_rationale, pros_participants,
          actfee_proposed, actfee_expense, actfee_collection, selected_sdg, alignment_explanation,
          objective1_title, objective1_explanation, objective2_title, objective2_explanation,
          objective3_title, objective3_explanation, ilo1, ilo2, ilo3, house_rules, sy_id,
          date_created, step_at, status, on_revision
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const proposalValues = [
        finalProsKey, org_id, 'Off-Campus A', pros_nature, null, pros_title, null, null,
        null, pros_rationale, null,
        actfee_proposed, actfee_expense, actfee_collection,
        selected_sdg, alignmentExplanationStr,
        objective1_title, objective1_explanation, objective2_title, objective2_explanation,
        objective3_title, objective3_explanation, ilo1, ilo2, ilo3, house_rules, sy_id,
        new Date(), 1, 'Pending Approval of Adviser', false
      ];

      // Log the values being inserted for debugging
      console.log("Values being inserted:", proposalValues);

      const proposalResult = await query(proposalQuery, proposalValues);
      console.log("Proposal added:", proposalResult.insertId);

      // Fetch existing schedacts keys to determine the next available key
      const existingSchKeysQuery = 'SELECT sch_key FROM schedacts';
      const existingSchKeysResult = await query(existingSchKeysQuery);
      const existingSchKeys = existingSchKeysResult.map(row => parseInt(row.sch_key.split('_')[1], 10));
      const maxExistingSchKey = existingSchKeys.length > 0 ? Math.max(...existingSchKeys) : 0;

      // Fetch existing activity fee keys to determine the next available key
      const existingActfeeKeysQuery = 'SELECT actfee_key FROM actfee';
      const existingActfeeKeysResult = await query(existingActfeeKeysQuery);
      const existingActfeeKeys = existingActfeeKeysResult.map(row => parseInt(row.actfee_key.split('_')[1], 10));
      const maxExistingActfeeKey = existingActfeeKeys.length > 0 ? Math.max(...existingActfeeKeys) : 0;

      // Fetch existing participant keys to determine the next available key
      const existingPartKeysQuery = 'SELECT participant_id FROM participants';
      const existingPartKeysResult = await query(existingPartKeysQuery);
      const existingPartKeys = existingPartKeysResult.map(row => parseInt(row.participant_id.split('_')[1], 10));
      const maxExistingPartKey = existingPartKeys.length > 0 ? Math.max(...existingPartKeys) : 0;

      // Save programs
      if (schedacts && schedacts.length > 0) {
        const schQuery = "INSERT INTO schedacts (sch_key, pros_key, sch_date, sch_start, sch_end, sch_place) VALUES ?";
        const schValues = JSON.parse(schedacts).map((sch, index) => [
          `sch_${maxExistingSchKey + index + 1}`, finalProsKey, sch.sch_date, sch.sch_start, sch.sch_end, sch.sch_place
        ]);
        await query(schQuery, [schValues]);
        console.log("Sched Act added:", schValues.length);
      }

      // Save activity fees
      if (actfees && actfees.length > 0) {
        const actfeeQuery = "INSERT INTO actfee (actfee_key, pros_key, actfee_particulars, actfee_quantity, actfee_amount) VALUES ?";
        const actfeeValues = JSON.parse(actfees).map((actfee, index) => [
          `actfee_${maxExistingActfeeKey + index + 1}`, finalProsKey, actfee.actfee_particulars, actfee.actfee_quantity, actfee.actfee_amount
        ]);
        await query(actfeeQuery, [actfeeValues]);
        console.log("Activity fees added:", actfeeValues.length);
      }

      // Save participants
      if (participants && participants.length > 0) {
        const participantQuery = "INSERT INTO participants (participant_id, pros_key, stud_id, permit) VALUES ?";
        const participantValues = JSON.parse(participants).map((participant, index) => [
          `part_${maxExistingPartKey + index + 1}`, finalProsKey, participant.stud_id, participant.permit
        ]);
        await query(participantQuery, [participantValues]);
        console.log("Participants added:", participantValues.length);
      }

      return res.json({ pros_key: finalProsKey, ...req.body });
    } catch (err) {
      console.error("Error adding proposal:", err);
      return res.status(500).json({ error: "Failed to add proposal" });
    }
  });

  app.get('/proposals/:pros_key', async (req, res) => {
    const { pros_key } = req.params;
    console.log(`Fetching proposal with key: ${pros_key}`);
    try {
      const proposalQuery = 'SELECT * FROM proposals WHERE pros_key = ?';
      const proposalResult = await query(proposalQuery, [pros_key]);
      console.log(`Proposal result: ${JSON.stringify(proposalResult)}`);
      if (proposalResult.length > 0) {
        res.json(proposalResult[0]);
      } else {
        res.status(404).json({ error: 'Proposal not found' });
      }
    } catch (err) {
      console.error("Error fetching proposal:", err);
      res.status(500).json({ error: "Failed to fetch proposal" });
    }
  });

app.post('/proposals/outcampus-b/add', upload.fields([]), async (req, res) => {
    const {
      pros_nature, org_id, pros_title, pros_rationale, selected_sdg,
      alignment_explanation, objective1_title, objective1_explanation,
      objective2_title, objective2_explanation, objective3_title,
      objective3_explanation, ilo1, ilo2, ilo3,
      actfee_proposed, actfee_expense, actfee_collection, house_rules,
      schedacts, actfees, participants
    } = req.body;

    try {
      // Generate pros_key
      const prosKeyQuery = 'SELECT MAX(CAST(SUBSTRING(pros_key, 6) AS UNSIGNED)) AS max_pros_key FROM proposals';
      const prosKeyResult = await query(prosKeyQuery);
      const maxProsKey = prosKeyResult[0].max_pros_key || 0;
      const finalProsKey = `pros_${maxProsKey + 1}`;

      // Log the received data for debugging
      console.log("Received data:", req.body);

      // Ensure that alignment_explanation is a string
      const alignmentExplanationStr = alignment_explanation.toString();

      // Find the active school year
      const activeSchoolYearQuery = 'SELECT sy_id FROM schoolyear WHERE isActive = 1';
      const activeSchoolYearResult = await query(activeSchoolYearQuery);
      const sy_id = activeSchoolYearResult[0].sy_id;

      const proposalQuery = `
        INSERT INTO proposals (
          pros_key, org_id, pros_type, pros_nature, pros_proponent, pros_title, pros_date, pros_venue,
          pros_objectives, pros_rationale, pros_participants,
          actfee_proposed, actfee_expense, actfee_collection, selected_sdg, alignment_explanation,
          objective1_title, objective1_explanation, objective2_title, objective2_explanation,
          objective3_title, objective3_explanation, ilo1, ilo2, ilo3, house_rules, sy_id,
          date_created, step_at, status, on_revision
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const proposalValues = [
        finalProsKey, org_id, 'Off-Campus B', pros_nature, null, pros_title, null, null,
        null, pros_rationale, null,
        actfee_proposed, actfee_expense, actfee_collection,
        selected_sdg, alignmentExplanationStr,
        objective1_title, objective1_explanation, objective2_title, objective2_explanation,
        objective3_title, objective3_explanation, ilo1, ilo2, ilo3, house_rules, sy_id,
        new Date(), 1, 'Pending Approval of Adviser', false
      ];

      // Log the values being inserted for debugging
      console.log("Values being inserted:", proposalValues);

      const proposalResult = await query(proposalQuery, proposalValues);
      console.log("Proposal added:", proposalResult.insertId);

      // Fetch existing schedacts keys to determine the next available key
      const existingSchKeysQuery = 'SELECT sch_key FROM schedacts';
      const existingSchKeysResult = await query(existingSchKeysQuery);
      const existingSchKeys = existingSchKeysResult.map(row => parseInt(row.sch_key.split('_')[1], 10));
      const maxExistingSchKey = existingSchKeys.length > 0 ? Math.max(...existingSchKeys) : 0;

      // Fetch existing activity fee keys to determine the next available key
      const existingActfeeKeysQuery = 'SELECT actfee_key FROM actfee';
      const existingActfeeKeysResult = await query(existingActfeeKeysQuery);
      const existingActfeeKeys = existingActfeeKeysResult.map(row => parseInt(row.actfee_key.split('_')[1], 10));
      const maxExistingActfeeKey = existingActfeeKeys.length > 0 ? Math.max(...existingActfeeKeys) : 0;

      // Fetch existing participant keys to determine the next available key
      const existingPartKeysQuery = 'SELECT participant_id FROM participants';
      const existingPartKeysResult = await query(existingPartKeysQuery);
      const existingPartKeys = existingPartKeysResult.map(row => parseInt(row.participant_id.split('_')[1], 10));
      const maxExistingPartKey = existingPartKeys.length > 0 ? Math.max(...existingPartKeys) : 0;

      // Save programs
      if (schedacts && schedacts.length > 0) {
        const schQuery = "INSERT INTO schedacts (sch_key, pros_key, sch_date, sch_start, sch_end, sch_place) VALUES ?";
        const schValues = JSON.parse(schedacts).map((sch, index) => [
          `sch_${maxExistingSchKey + index + 1}`, finalProsKey, sch.sch_date, sch.sch_start, sch.sch_end, sch.sch_place
        ]);
        await query(schQuery, [schValues]);
        console.log("Sched Act added:", schValues.length);
      }

      // Save activity fees
      if (actfees && actfees.length > 0) {
        const actfeeQuery = "INSERT INTO actfee (actfee_key, pros_key, actfee_particulars, actfee_amount) VALUES ?";
        const actfeeValues = JSON.parse(actfees).map((actfee, index) => [
          `actfee_${maxExistingActfeeKey + index + 1}`, finalProsKey, actfee.particulars, actfee.amount
        ]);
        await query(actfeeQuery, [actfeeValues]);
        console.log("Activity fees added:", actfeeValues.length);
      }

      // Save participants
      if (participants && participants.length > 0) {
        const participantQuery = "INSERT INTO participants (participant_id, pros_key, stud_id, permit) VALUES ?";
        const participantValues = JSON.parse(participants).map((participant, index) => [
          `part_${maxExistingPartKey + index + 1}`, finalProsKey, participant.stud_id, participant.permit
        ]);
        await query(participantQuery, [participantValues]);
        console.log("Participants added:", participantValues.length);
      }

      return res.json({ pros_key: finalProsKey, ...req.body });
    } catch (err) {
      console.error("Error adding proposal:", err);
      return res.status(500).json({ error: "Failed to add proposal" });
    }
  });

  app.get('/proposals/:pros_key', async (req, res) => {
    const { pros_key } = req.params;
    console.log(`Fetching proposal with key: ${pros_key}`);
    try {
      const proposalQuery = 'SELECT * FROM proposals WHERE pros_key = ?';
      const proposalResult = await query(proposalQuery, [pros_key]);
      console.log(`Proposal result: ${JSON.stringify(proposalResult)}`);
      if (proposalResult.length > 0) {
        res.json(proposalResult[0]);
      } else {
        res.status(404).json({ error: 'Proposal not found' });
      }
    } catch (err) {
      console.error("Error fetching proposal:", err);
      res.status(500).json({ error: "Failed to fetch proposal" });
    }
  });

  app.put('/proposals/:pros_key', upload.fields([]), async (req, res) => {
    const { pros_key } = req.params;
    const {
      org_id,
      pros_nature,
      pros_proponent,
      pros_title,
      pros_date,
      pros_venue,
      pros_objectives,
      pros_rationale,
      pros_participants,
      selected_sdg,
      alignment_explanation,
      objective1_title,
      objective1_explanation,
      objective2_title,
      objective2_explanation,
      objective3_title,
      objective3_explanation,
      ilo1,
      ilo2,
      ilo3,
      house_rules,
      programsOfActivity,
      budgetSources,
      budgetAllocations,
      participants,
      committees,
      allMembersNote
    } = req.body;
  
    try {
      // Log the received data for debugging
      console.log("Received data:", req.body);
  
      // Ensure that programsOfActivity, budgetSources, budgetAllocations, participants, and committees are arrays
      const parsedProgramsOfActivity = Array.isArray(programsOfActivity) ? programsOfActivity : JSON.parse(programsOfActivity || '[]');
      const parsedBudgetSources = Array.isArray(budgetSources) ? budgetSources : JSON.parse(budgetSources || '[]');
      const parsedBudgetAllocations = Array.isArray(budgetAllocations) ? budgetAllocations : JSON.parse(budgetAllocations || '[]');
      const parsedParticipants = Array.isArray(participants) ? participants : JSON.parse(participants || '[]');
      const parsedCommittees = Array.isArray(committees) ? committees : JSON.parse(committees || '[]');
  
      // Log the parsed data for debugging
      console.log("Parsed programsOfActivity:", parsedProgramsOfActivity);
      console.log("Parsed budgetSources:", parsedBudgetSources);
      console.log("Parsed budgetAllocations:", parsedBudgetAllocations);
      console.log("Parsed participants:", parsedParticipants);
      console.log("Parsed committees:", parsedCommittees);
  
      // Update the proposal details
      const proposalQuery = `
          UPDATE proposals
          SET org_id = ?, pros_nature = ?, pros_proponent = ?, pros_title = ?, pros_date = ?, pros_venue = ?,
              pros_objectives = ?, pros_rationale = ?, pros_participants = ?, selected_sdg = ?, alignment_explanation = ?,
              objective1_title = ?, objective1_explanation = ?, objective2_title = ?, objective2_explanation = ?,
              objective3_title = ?, objective3_explanation = ?, ilo1 = ?, ilo2 = ?, ilo3 = ?, house_rules = ?, on_revision = ?, note = ?
          WHERE pros_key = ?
      `;
      const proposalValues = [
          org_id,
          pros_nature,
          pros_proponent,
          pros_title,
          pros_date,
          pros_venue,
          pros_objectives,
          pros_rationale,
          pros_participants,
          selected_sdg,
          alignment_explanation,
          objective1_title,
          objective1_explanation,
          objective2_title,
          objective2_explanation,
          objective3_title,
          objective3_explanation,
          ilo1,
          ilo2,
          ilo3,
          house_rules,
          false,
          allMembersNote,
          pros_key
      ];
  
      await query(proposalQuery, proposalValues);
  
      // Fetch existing program keys to determine the next available key
      const existingProgKeysQuery = 'SELECT MAX(CAST(SUBSTRING(prog_key, 6) AS UNSIGNED)) AS max_prog_key FROM programs';
      const existingProgKeysResult = await query(existingProgKeysQuery);
      const maxExistingProgKey = existingProgKeysResult[0].max_prog_key || 0;
  
      // Fetch existing budget keys to determine the next available key
      const existingBudgetKeysQuery = 'SELECT MAX(CAST(SUBSTRING(budget_key, 8) AS UNSIGNED)) AS max_budget_key FROM budgets';
      const existingBudgetKeysResult = await query(existingBudgetKeysQuery);
      const maxExistingBudgetKey = existingBudgetKeysResult[0].max_budget_key || 0;
  
      // Fetch existing allocation keys to determine the next available key
      const existingAllocKeysQuery = 'SELECT MAX(CAST(SUBSTRING(allocation_key, 7) AS UNSIGNED)) AS max_alloc_key FROM allocations';
      const existingAllocKeysResult = await query(existingAllocKeysQuery);
      const maxExistingAllocKey = existingAllocKeysResult[0].max_alloc_key || 0;
  
      // Fetch existing participant keys to determine the next available key
      const existingPartKeysQuery = 'SELECT MAX(CAST(SUBSTRING(participant_id, 6) AS UNSIGNED)) AS max_part_key FROM participants';
      const existingPartKeysResult = await query(existingPartKeysQuery);
      const maxExistingPartKey = existingPartKeysResult[0].max_part_key || 0;
  
      // Fetch existing committee keys to determine the next available key
      const existingCommKeysQuery = 'SELECT MAX(CAST(SUBSTRING(comm_key, 6) AS UNSIGNED)) AS max_comm_key FROM committees';
      const existingCommKeysResult = await query(existingCommKeysQuery);
      const maxExistingCommKey = existingCommKeysResult[0].max_comm_key || 0;
  
      // Delete existing programs of activity
      await query('DELETE FROM programs WHERE pros_key = ?', [pros_key]);
  
      // Insert new programs of activity
      if (parsedProgramsOfActivity && parsedProgramsOfActivity.length > 0) {
          const programQuery = "INSERT INTO programs (prog_key, pros_key, prog_title, prog_start, prog_end, prog_persons) VALUES ?";
          const programValues = parsedProgramsOfActivity.map((program, index) => [
              `prog_${maxExistingProgKey + index + 1}`, pros_key, program.prog_title, program.prog_start, program.prog_end, program.prog_persons
          ]);
          await query(programQuery, [programValues]);
      }
  
      // Delete existing budget sources
      await query('DELETE FROM budgets WHERE pros_key = ?', [pros_key]);
  
      // Insert new budget sources
      if (parsedBudgetSources && parsedBudgetSources.length > 0) {
          const budgetSourceQuery = "INSERT INTO budgets (budget_key, pros_key, budget_source, budget_particulars) VALUES ?";
          const budgetSourceValues = parsedBudgetSources.map((source, index) => [
              `source_${maxExistingBudgetKey + index + 1}`, pros_key, source.budget_source, source.budget_particulars
          ]);
          await query(budgetSourceQuery, [budgetSourceValues]);
      }
  
      // Delete existing budget allocations
      await query('DELETE FROM allocations WHERE pros_key = ?', [pros_key]);
  
      // Insert new budget allocations
      if (parsedBudgetAllocations && parsedBudgetAllocations.length > 0) {
          const budgetAllocationQuery = "INSERT INTO allocations (allocation_key, pros_key, allocation_particulars, allocation_quantity, allocation_amount) VALUES ?";
          const budgetAllocationValues = parsedBudgetAllocations.map((allocation, index) => [
              `alloc_${maxExistingAllocKey + index + 1}`, pros_key, allocation.allocation_particulars, allocation.allocation_quantity, allocation.allocation_amount
          ]);
          await query(budgetAllocationQuery, [budgetAllocationValues]);
      }
  
      // Delete existing participants
      await query('DELETE FROM participants WHERE pros_key = ?', [pros_key]);
  
      // Insert new participants
      if (parsedParticipants && parsedParticipants.length > 0) {
          const participantQuery = "INSERT INTO participants (participant_id, pros_key, stud_id, permit) VALUES ?";
          const participantValues = parsedParticipants.map((participant, index) => [
              `part_${maxExistingPartKey + index + 1}`, pros_key, participant.stud_id, null
          ]);
          await query(participantQuery, [participantValues]);
      }
  
      // Delete existing committees
      await query('DELETE FROM committees WHERE pros_key = ?', [pros_key]);
  
      // Insert new committees
      if (parsedCommittees && parsedCommittees.length > 0) {
          const committeeQuery = "INSERT INTO committees (comm_key, pros_key, comm_name, comm_members) VALUES ?";
          const committeeValues = parsedCommittees.map((committee, index) => [
              `comm_${maxExistingCommKey + index + 1}`, pros_key, committee.comm_name, committee.comm_members
          ]);
          await query(committeeQuery, [committeeValues]);
      }
  
      res.status(200).json({ message: "Proposal updated successfully" });
    } catch (err) {
      console.error("Error updating proposal:", err);
      res.status(500).json({ error: "Failed to update proposal" });
    }
  });  

app.put('/proposals/outcampus-a/update/:pros_key', upload.fields([]), async (req, res) => {
    const { pros_key } = req.params;
    const {
        pros_nature,
        pros_title,
        pros_rationale,
        selected_sdg,
        alignment_explanation,
        objective1_title,
        objective1_explanation,
        objective2_title,
        objective2_explanation,
        objective3_title,
        objective3_explanation,
        ilo1,
        ilo2,
        ilo3,
        actfee_proposed,
        actfee_expense,
        actfee_collection,
        house_rules,
        schedacts,
        actfees,
        participants,
    } = req.body;

    try {
        // Log the received data for debugging
        console.log("Received data:", req.body);

        // Ensure that schedacts, actfees, and participants are arrays
        const parsedSchedActs = Array.isArray(schedacts) ? schedacts : JSON.parse(schedacts || '[]');
        const parsedActFees = Array.isArray(actfees) ? actfees : JSON.parse(actfees || '[]');
        const parsedParticipants = Array.isArray(participants) ? participants : JSON.parse(participants || '[]');

        // Log the parsed data for debugging
        console.log("Parsed schedacts:", parsedSchedActs);
        console.log("Parsed actfees:", parsedActFees);
        console.log("Parsed participants:", parsedParticipants);

        // Update the proposal details
        const proposalQuery = `
            UPDATE proposals
            SET pros_nature = ?, pros_title = ?, pros_rationale = ?, selected_sdg = ?, alignment_explanation = ?,
                objective1_title = ?, objective1_explanation = ?, objective2_title = ?, objective2_explanation = ?,
                objective3_title = ?, objective3_explanation = ?, ilo1 = ?, ilo2 = ?, ilo3 = ?,
                actfee_proposed = ?, actfee_expense = ?, actfee_collection = ?, house_rules = ?
            WHERE pros_key = ?
        `;
        const proposalValues = [
            pros_nature,
            pros_title,
            pros_rationale,
            selected_sdg,
            alignment_explanation,
            objective1_title,
            objective1_explanation,
            objective2_title,
            objective2_explanation,
            objective3_title,
            objective3_explanation,
            ilo1,
            ilo2,
            ilo3,
            actfee_proposed,
            actfee_expense,
            actfee_collection,
            house_rules,
            pros_key
        ];

        await query(proposalQuery, proposalValues);

        // Fetch existing schedule keys to determine the next available key
        const existingSchKeysQuery = 'SELECT MAX(CAST(SUBSTRING(sch_key, 5) AS UNSIGNED)) AS max_sch_key FROM schedacts';
        const existingSchKeysResult = await query(existingSchKeysQuery);
        const maxExistingSchKey = existingSchKeysResult[0].max_sch_key || 0;

        // Fetch existing act fee keys to determine the next available key
        const existingActFeeKeysQuery = 'SELECT MAX(CAST(SUBSTRING(actfee_key, 8) AS UNSIGNED)) AS max_actfee_key FROM actfee';
        const existingActFeeKeysResult = await query(existingActFeeKeysQuery);
        const maxExistingActFeeKey = existingActFeeKeysResult[0].max_actfee_key || 0;

        // Fetch existing participant keys to determine the next available key
        const existingPartKeysQuery = 'SELECT MAX(CAST(SUBSTRING(participant_id, 6) AS UNSIGNED)) AS max_part_key FROM participants';
        const existingPartKeysResult = await query(existingPartKeysQuery);
        const maxExistingPartKey = existingPartKeysResult[0].max_part_key || 0;

        // Delete existing schedacts
        await query('DELETE FROM schedacts WHERE pros_key = ?', [pros_key]);

        // Insert new schedacts
        if (parsedSchedActs && parsedSchedActs.length > 0) {
            const schedActQuery = "INSERT INTO schedacts (sch_key, pros_key, sch_date, sch_start, sch_end, sch_place) VALUES ?";
            const schedActValues = parsedSchedActs.map((schedact, index) => [
                `sch_${maxExistingSchKey + index + 1}`, pros_key, schedact.sch_date, schedact.sch_start, schedact.sch_end, schedact.sch_place
            ]);
            await query(schedActQuery, [schedActValues]);
        }

        // Delete existing actfees
        await query('DELETE FROM actfee WHERE pros_key = ?', [pros_key]);

        // Insert new actfees
        if (parsedActFees && parsedActFees.length > 0) {
            const actFeeQuery = "INSERT INTO actfee (actfee_key, pros_key, actfee_particulars, actfee_quantity, actfee_amount) VALUES ?";
            const actFeeValues = parsedActFees.map((actfee, index) => [
                `actfee_${maxExistingActFeeKey + index + 1}`, pros_key, actfee.actfee_particulars, actfee.actfee_quantity, actfee.actfee_amount
            ]);
            await query(actFeeQuery, [actFeeValues]);
        }

        // Delete existing participants
        await query('DELETE FROM participants WHERE pros_key = ?', [pros_key]);

        // Insert new participants
        if (parsedParticipants && parsedParticipants.length > 0) {
            const participantQuery = "INSERT INTO participants (participant_id, pros_key, stud_id, permit) VALUES ?";
            const participantValues = parsedParticipants.map((participant, index) => [
                `part_${maxExistingPartKey + index + 1}`, pros_key, participant.stud_id, participant.permit
            ]);
            await query(participantQuery, [participantValues]);
        }

        res.status(200).json({ message: "Proposal updated successfully" });
    } catch (err) {
        console.error("Error updating proposal:", err);
        res.status(500).json({ error: "Failed to update proposal" });
    }
});

// update out campus b
app.put('/proposals/outcampus-b/update/:pros_key', upload.fields([]), async (req, res) => {
    const { pros_key } = req.params;
    const {
        pros_nature,
        pros_title,
        pros_rationale,
        selected_sdg,
        alignment_explanation,
        objective1_title,
        objective1_explanation,
        objective2_title,
        objective2_explanation,
        objective3_title,
        objective3_explanation,
        ilo1,
        ilo2,
        ilo3,
        actfee_proposed,
        actfee_expense,
        actfee_collection,
        house_rules,
        schedacts,
        actfees,
        participants,
    } = req.body;

    try {
        // Log the received data for debugging
        console.log("Received data:", req.body);

        // Ensure that schedacts, actfees, and participants are arrays
        const parsedSchedActs = Array.isArray(schedacts) ? schedacts : JSON.parse(schedacts || '[]');
        const parsedActFees = Array.isArray(actfees) ? actfees : JSON.parse(actfees || '[]');
        const parsedParticipants = Array.isArray(participants) ? participants : JSON.parse(participants || '[]');

        // Log the parsed data for debugging
        console.log("Parsed schedacts:", parsedSchedActs);
        console.log("Parsed actfees:", parsedActFees);
        console.log("Parsed participants:", parsedParticipants);

        // Update the proposal details
        const proposalQuery = `
            UPDATE proposals
            SET pros_nature = ?, pros_title = ?, pros_rationale = ?, selected_sdg = ?, alignment_explanation = ?,
                objective1_title = ?, objective1_explanation = ?, objective2_title = ?, objective2_explanation = ?,
                objective3_title = ?, objective3_explanation = ?, ilo1 = ?, ilo2 = ?, ilo3 = ?,
                actfee_proposed = ?, actfee_expense = ?, actfee_collection = ?, house_rules = ?
            WHERE pros_key = ?
        `;
        const proposalValues = [
            pros_nature,
            pros_title,
            pros_rationale,
            selected_sdg,
            alignment_explanation,
            objective1_title,
            objective1_explanation,
            objective2_title,
            objective2_explanation,
            objective3_title,
            objective3_explanation,
            ilo1,
            ilo2,
            ilo3,
            actfee_proposed,
            actfee_expense,
            actfee_collection,
            house_rules,
            pros_key
        ];

        await query(proposalQuery, proposalValues);

        // Fetch existing schedule keys to determine the next available key
        const existingSchKeysQuery = 'SELECT MAX(CAST(SUBSTRING(sch_key, 5) AS UNSIGNED)) AS max_sch_key FROM schedacts';
        const existingSchKeysResult = await query(existingSchKeysQuery);
        const maxExistingSchKey = existingSchKeysResult[0].max_sch_key || 0;

        // Fetch existing act fee keys to determine the next available key
        const existingActFeeKeysQuery = 'SELECT MAX(CAST(SUBSTRING(actfee_key, 8) AS UNSIGNED)) AS max_actfee_key FROM actfee';
        const existingActFeeKeysResult = await query(existingActFeeKeysQuery);
        const maxExistingActFeeKey = existingActFeeKeysResult[0].max_actfee_key || 0;

        // Fetch existing participant keys to determine the next available key
        const existingPartKeysQuery = 'SELECT MAX(CAST(SUBSTRING(participant_id, 6) AS UNSIGNED)) AS max_part_key FROM participants';
        const existingPartKeysResult = await query(existingPartKeysQuery);
        const maxExistingPartKey = existingPartKeysResult[0].max_part_key || 0;

        // Delete existing schedacts
        await query('DELETE FROM schedacts WHERE pros_key = ?', [pros_key]);

        // Insert new schedacts
        if (parsedSchedActs && parsedSchedActs.length > 0) {
            const schedActQuery = "INSERT INTO schedacts (sch_key, pros_key, sch_date, sch_start, sch_end, sch_place) VALUES ?";
            const schedActValues = parsedSchedActs.map((schedact, index) => [
                `sch_${maxExistingSchKey + index + 1}`, pros_key, schedact.sch_date, schedact.sch_start, schedact.sch_end, schedact.sch_place
            ]);
            await query(schedActQuery, [schedActValues]);
        }

        // Delete existing actfees
        await query('DELETE FROM actfee WHERE pros_key = ?', [pros_key]);

        // Insert new actfees
        if (parsedActFees && parsedActFees.length > 0) {
            const actFeeQuery = "INSERT INTO actfee (actfee_key, pros_key, actfee_particulars, actfee_quantity, actfee_amount) VALUES ?";
            const actFeeValues = parsedActFees.map((actfee, index) => [
                `actfee_${maxExistingActFeeKey + index + 1}`, pros_key, actfee.actfee_particulars, actfee.actfee_quantity, actfee.actfee_amount
            ]);
            await query(actFeeQuery, [actFeeValues]);
        }

        // Delete existing participants
        await query('DELETE FROM participants WHERE pros_key = ?', [pros_key]);

        // Insert new participants
        if (parsedParticipants && parsedParticipants.length > 0) {
            const participantQuery = "INSERT INTO participants (participant_id, pros_key, stud_id, permit) VALUES ?";
            const participantValues = parsedParticipants.map((participant, index) => [
                `part_${maxExistingPartKey + index + 1}`, pros_key, participant.stud_id, participant.permit
            ]);
            await query(participantQuery, [participantValues]);
        }

        res.status(200).json({ message: "Proposal updated successfully" });
    } catch (err) {
        console.error("Error updating proposal:", err);
        res.status(500).json({ error: "Failed to update proposal" });
    }
});

app.put('/proposals/update/:pros_key', upload.fields([]), (req, res) => {
    const { pros_key } = req.params;
    const { actfee_proposed, actfee_budget, actfee_collection } = req.body;

    const q = `
        UPDATE proposals
        SET actfee_proposed = ?, actfee_budget = ?, actfee_collection = ?
        WHERE pros_key = ?
    `;
    const values = [actfee_proposed, actfee_budget, actfee_collection, pros_key];

    db.query(q, values, (err, result) => {
        if (err) {
            console.error("Error updating proposal:", err);
            return res.status(500).json({ error: "Failed to update proposal" });
        }
        console.log("Proposal updated:", result.affectedRows);
        return res.json({ message: "Proposal updated successfully" });
    });
});

// delete proposal
app.delete('/proposals/:pros_key', async (req, res) => {
    const { pros_key } = req.params;

    try {
        await db.beginTransaction();

        await query('DELETE FROM programs WHERE pros_key = ?', [pros_key]);
        await query('DELETE FROM budgets WHERE pros_key = ?', [pros_key]);
        await query('DELETE FROM allocations WHERE pros_key = ?', [pros_key]);
        await query('DELETE FROM participants WHERE pros_key = ?', [pros_key]);
        await query('DELETE FROM committees WHERE pros_key = ?', [pros_key]);
        await query('DELETE FROM schedacts WHERE pros_key = ?', [pros_key]);
        await query('DELETE FROM actfee WHERE pros_key = ?', [pros_key]);

        await query('DELETE FROM proposals WHERE pros_key = ?', [pros_key]);

        await db.commit();

        res.status(200).json({ message: 'Proposal and related data deleted successfully' });
    } catch (err) {
        await db.rollback();
        console.error("Error deleting proposal:", err);
        res.status(500).json({ error: "Failed to delete proposal" });
    }
});

app.post('/users/login', async (req, res) => {
    const { user_id, user_password, user_role } = req.body;

    try {
        const q = "SELECT * FROM users WHERE user_id = ? AND user_password = ? AND user_role = ?";
        const result = await query(q, [user_id, user_password, user_role]);

        if (result.length > 0) {
            res.json({ success: true, user_id: result[0].user_id });
        } else {
            res.status(401).json({ success: false, message: 'Invalid user credentials' });
        }
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.put('/proposals/approve/adviser/:pros_key', async (req, res) => {
    const { pros_key } = req.params;

    try {
        // get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString(); // format the date as needed

        // update the proposal status and step_at with the current date and time
        const q = "UPDATE proposals SET status = ?, step_at = ? WHERE pros_key = ?";
        const newStatus = `${formattedDate} - Approved by Organization Adviser`;
        const newStepAt = 2;

        await query(q, [newStatus, newStepAt, pros_key]);

        res.status(200).json({ message: "Proposal approved successfully" });
    } catch (err) {
        console.error("Error approving proposal:", err);
        res.status(500).json({ error: "Failed to approve proposal" });
    }
});

app.post('/proposals/reject/adviser/:pros_key', async (req, res) => {
    const { pros_key } = req.params;
    const { comment } = req.body;

    try {
        // update the proposal status and set on_revision to true
        const updateProposalQuery = "UPDATE proposals SET status = 'Rejected by Organization Adviser', on_revision = TRUE WHERE pros_key = ?";
        await query(updateProposalQuery, [pros_key]);

        // get the maximum comment_key from the comments table
        const maxCommentKeyQuery = "SELECT MAX(CAST(SUBSTRING(comment_key, 9) AS UNSIGNED)) AS max_comment_key FROM comments";
        const maxCommentKeyResult = await query(maxCommentKeyQuery);
        const maxCommentKey = maxCommentKeyResult[0].max_comment_key || 0;
        const newCommentKey = `comment_${maxCommentKey + 1}`;

        // get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // format the date as needed

        // insert the comment into the comments table
        const insertCommentQuery = "INSERT INTO comments (comment_key, pros_key, comment_content, date) VALUES (?, ?, ?, ?)";
        await query(insertCommentQuery, [newCommentKey, pros_key, comment, formattedDate]);

        res.status(200).json({ message: "Proposal rejected and comment added successfully" });
    } catch (err) {
        console.error("Error rejecting proposal:", err);
        res.status(500).json({ error: "Failed to reject proposal" });
    }
});

app.put('/proposals/approve/dean/:pros_key', async (req, res) => {
    const { pros_key } = req.params;

    try {
        // get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString(); // format the date as needed

        // update the proposal status and step_at with the current date and time
        const q = "UPDATE proposals SET status = ?, step_at = ? WHERE pros_key = ?";
        const newStatus = `${formattedDate} - Approved by College Dean`;
        const newStepAt = 3;

        await query(q, [newStatus, newStepAt, pros_key]);

        res.status(200).json({ message: "Proposal approved successfully" });
    } catch (err) {
        console.error("Error approving proposal:", err);
        res.status(500).json({ error: "Failed to approve proposal" });
    }
});

app.post('/proposals/reject/dean/:pros_key', async (req, res) => {
    const { pros_key } = req.params;
    const { comment } = req.body;

    try {
        // update the proposal status and set on_revision to true
        const updateProposalQuery = "UPDATE proposals SET status = 'Rejected by College Dean', on_revision = TRUE WHERE pros_key = ?";
        await query(updateProposalQuery, [pros_key]);

        // get the maximum comment_key from the comments table
        const maxCommentKeyQuery = "SELECT MAX(CAST(SUBSTRING(comment_key, 9) AS UNSIGNED)) AS max_comment_key FROM comments";
        const maxCommentKeyResult = await query(maxCommentKeyQuery);
        const maxCommentKey = maxCommentKeyResult[0].max_comment_key || 0;
        const newCommentKey = `comment_${maxCommentKey + 1}`;

        // get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // format the date as needed

        // insert the comment into the comments table
        const insertCommentQuery = "INSERT INTO comments (comment_key, pros_key, comment_content, date) VALUES (?, ?, ?, ?)";
        await query(insertCommentQuery, [newCommentKey, pros_key, comment, formattedDate]);

        res.status(200).json({ message: "Proposal rejected and comment added successfully" });
    } catch (err) {
        console.error("Error rejecting proposal:", err);
        res.status(500).json({ error: "Failed to reject proposal" });
    }
});

app.put('/proposals/approve/osa/:pros_key', async (req, res) => {
    const { pros_key } = req.params;

    try {
        // Fetch the proposal details
        const proposalQuery = "SELECT pros_type, pros_nature FROM proposals WHERE pros_key = ?";
        const proposalResult = await query(proposalQuery, [pros_key]);

        if (proposalResult.length === 0) {
            return res.status(404).json({ error: "Proposal not found" });
        }

        const { pros_type, pros_nature } = proposalResult[0];

        // Determine the newStepAt based on pros_type and pros_nature
        let newStepAt;
        if (pros_type === 'In Campus' && pros_nature === 'Co-Curricular') {
            newStepAt = 4;
        } else if (pros_type === 'Off-Campus A' || pros_type === 'Off-Campus B') {
            newStepAt = 4;
        } else {
            newStepAt = 3; // Default case
        }

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString(); // Format the date as needed

        // Update the proposal status and step_at with the current date and time
        const updateQuery = "UPDATE proposals SET status = ?, step_at = ? WHERE pros_key = ?";
        const newStatus = `${formattedDate} - Approved by Director of Student Affairs`;

        await query(updateQuery, [newStatus, newStepAt, pros_key]);

        res.status(200).json({ message: "Proposal approved successfully" });
    } catch (err) {
        console.error("Error approving proposal:", err);
        res.status(500).json({ error: "Failed to approve proposal" });
    }
});


app.post('/proposals/reject/osa/:pros_key', async (req, res) => {
    const { pros_key } = req.params;
    const { comment } = req.body;

    try {
        // update the proposal status and set on_revision to true
        const updateProposalQuery = "UPDATE proposals SET status = 'Rejected by Director of Student Affairs', on_revision = TRUE WHERE pros_key = ?";
        await query(updateProposalQuery, [pros_key]);

        // get the maximum comment_key from the comments table
        const maxCommentKeyQuery = "SELECT MAX(CAST(SUBSTRING(comment_key, 9) AS UNSIGNED)) AS max_comment_key FROM comments";
        const maxCommentKeyResult = await query(maxCommentKeyQuery);
        const maxCommentKey = maxCommentKeyResult[0].max_comment_key || 0;
        const newCommentKey = `comment_${maxCommentKey + 1}`;

        // get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // format the date as needed

        // insert the comment into the comments table
        const insertCommentQuery = "INSERT INTO comments (comment_key, pros_key, comment_content, date) VALUES (?, ?, ?, ?)";
        await query(insertCommentQuery, [newCommentKey, pros_key, comment, formattedDate]);

        res.status(200).json({ message: "Proposal rejected and comment added successfully" });
    } catch (err) {
        console.error("Error rejecting proposal:", err);
        res.status(500).json({ error: "Failed to reject proposal" });
    }
});

app.put('/proposals/approve/dsaa/:pros_key', async (req, res) => {
    const { pros_key } = req.params;

    try {
        // Fetch the proposal details
        const proposalQuery = "SELECT pros_type, pros_nature FROM proposals WHERE pros_key = ?";
        const proposalResult = await query(proposalQuery, [pros_key]);

        if (proposalResult.length === 0) {
            return res.status(404).json({ error: "Proposal not found" });
        }

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString(); // Format the date as needed

        // Update the proposal status and step_at with the current date and time
        const updateQuery = "UPDATE proposals SET status = ?, step_at = ? WHERE pros_key = ?";

        const { pros_type, pros_nature } = proposalResult[0];
        let newStatus = '';
        let newStepAt;

        // Determine the newStepAt based on pros_type and pros_nature
        if (pros_type === 'In Campus' && pros_nature === 'Co-Curricular') {
            newStepAt = 5;
            newStatus = 'Fully Approved';
        } else if (pros_type === 'In Campus' || pros_type === 'Extra-Curricular') {
            newStepAt = 4;
            newStatus = 'Fully Approved';
        } else if (pros_type === 'Off-Campus A') {
            newStepAt = 5;
            newStatus = `${formattedDate} - Approved by Dean for Student and Alumni Affairs`;
        } else {
            newStepAt = 4; // Default case
        }

        await query(updateQuery, [newStatus, newStepAt, pros_key]);

        res.status(200).json({ message: "Proposal approved successfully" });
    } catch (err) {
        console.error("Error approving proposal:", err);
        res.status(500).json({ error: "Failed to approve proposal" });
    }
});

app.post('/proposals/reject/dsaa/:pros_key', async (req, res) => {
    const { pros_key } = req.params;
    const { comment } = req.body;

    try {
        // update the proposal status and set on_revision to true
        const updateProposalQuery = "UPDATE proposals SET status = 'Rejected by Dean for Student and Alumni Affairs', on_revision = TRUE WHERE pros_key = ?";
        await query(updateProposalQuery, [pros_key]);

        // get the maximum comment_key from the comments table
        const maxCommentKeyQuery = "SELECT MAX(CAST(SUBSTRING(comment_key, 9) AS UNSIGNED)) AS max_comment_key FROM comments";
        const maxCommentKeyResult = await query(maxCommentKeyQuery);
        const maxCommentKey = maxCommentKeyResult[0].max_comment_key || 0;
        const newCommentKey = `comment_${maxCommentKey + 1}`;

        // get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // format the date as needed

        // insert the comment into the comments table
        const insertCommentQuery = "INSERT INTO comments (comment_key, pros_key, comment_content, date) VALUES (?, ?, ?, ?)";
        await query(insertCommentQuery, [newCommentKey, pros_key, comment, formattedDate]);

        res.status(200).json({ message: "Proposal rejected and comment added successfully" });
    } catch (err) {
        console.error("Error rejecting proposal:", err);
        res.status(500).json({ error: "Failed to reject proposal" });
    }
});





// ! DANI'S BACKEND --------------------------------------------------------------------------------------------------------------

//insert data facilityrequest
app.post("/facilityrequest", async (req, res) => {
    try {
        // Generate new ID
        const prosKeyQuery = 'SELECT MAX(CAST(faci_id AS UNSIGNED)) AS max_faci_id FROM facilityrequest';
        
        // Execute query and wait for the result
        db.query(prosKeyQuery, (err, result) => {
            if (err) {
                console.error("Error fetching max faci_id:", err);
                return res.status(500).json({ success: false, message: "Database error", error: err.message });
            }

            const maxProsKey = result[0]?.max_faci_id || 0;
            const finalProsKey = maxProsKey + 1; // Ensure it's a number

            // Destructure request body
            const {
                org_id, participants, facility, actname, progdetails, date, timefaci, timefaciend,
                numberpart, invitedpers, reqdep, office, suspension, position, acttype, resources,
                amsco, services, adviser, otherfacility, acunits, displayboardpcs, monoblocpcs,
                pavtablepcs, otherresources, computerunits, projectorpcs, printerunits, otheramsco
            } = req.body;

            // Ensure required fields are provided
            if (!org_id || !participants || !facility || !actname || !date || !timefaci || !timefaciend) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            // SQL Query
            const q = `
                INSERT INTO facilityrequest (
                    faci_id, org_id, participants, facility, actname, progdetails, date, timefaci, timefaciend,
                    numberpart, invitedpers, reqdep, office, suspension, position, acttype, resources, amsco, services, adviser,
                    otherfacility, acunits, displayboardpcs, monoblocpcs, pavtablepcs, otherresources, computerunits, projectorpcs,
                    printerunits, otheramsco
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            // Values array
            const values = [
                finalProsKey, org_id, participants, facility, actname, progdetails, date, timefaci, timefaciend,
                numberpart, invitedpers, reqdep, office, suspension, position, acttype, resources, amsco, services, adviser,
                otherfacility, acunits, displayboardpcs, monoblocpcs, pavtablepcs, otherresources, computerunits, projectorpcs,
                printerunits, otheramsco
            ];

            // Execute SQL Query
            db.query(q, values, (err, data) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ success: false, message: "Error inserting data into the database", error: err.message });
                }
                return res.status(200).json({ success: true, message: "Data inserted successfully", data: data });
            });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ success: false, message: "An unexpected error occurred", error: error.message });
    }
});

//update facility
app.put("/updatefaci/:faci_id", (req, res) => {
    const { faci_id } = req.params;

    if (!faci_id) {
        return res.status(400).json({ error: "Facility ID is required" });
    }

    const q = `
        UPDATE facilityrequest 
        SET org_id = ?, participants = ?, facility = ?, actname = ?, progdetails = ?, 
        date = ?, timefaci = ?, timefaciend = ?, numberpart = ?, invitedpers = ?, reqdep = ?, office = ?, 
        suspension = ?, position = ?, acttype = ?, resources = ?, amsco = ?, services = ?, adviser = ?, 
        otherfacility  = ?, acunits = ?, displayboardpcs = ?, monoblocpcs = ?, pavtablepcs = ?, otherresources = ?, 
        computerunits = ?, projectorpcs = ?, printerunits = ?, otheramsco = ? 
        WHERE faci_id = ?`;

    const values = [
        req.body.org_id || null,
        req.body.participants || null,
        req.body.facility || null,
        req.body.actname || null,
        req.body.progdetails || null,
        req.body.date || null,
        req.body.timefaci || null,
        req.body.timefaciend || null,
        req.body.numberpart || null,
        req.body.invitedpers || null,
        req.body.reqdep || null,
        req.body.office || null,
        req.body.suspension || null,
        req.body.position || null,
        req.body.acttype || null,
        req.body.resources || null,
        req.body.amsco || null,
        req.body.services || null,
        req.body.adviser || null,
        req.body.otherfacility || null,
        req.body.acunits || null,
        req.body.displayboardpcs || null,
        req.body.monoblocpcs || null,
        req.body.pavtablepcs || null,
        req.body.otherresources || null,
        req.body.computerunits || null,
        req.body.projectorpcs || null,
        req.body.printerunits || null,
        req.body.otheramsco || null,
        faci_id // Ensure `faci_id` is placed at the end
    ];

    db.query(q, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Facility request not found" });
        }

        return res.status(200).json({ success: true, message: "Facility request updated successfully" });
    });
});



//fetch faci info form
  app.get("/searchreturned/:faci_id", (req, res) => {
    const faci_id = req.params.faci_id;
    const q = "SELECT * FROM facilityrequest WHERE faci_id = ?";
  
    db.query(q, [faci_id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

//fetch facility request adviser
  app.get("/facilityrequestadviser", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM facilityrequest WHERE status='Returned By Adviser for Revisions' OR status=''";
 // WHERE status='Returned By Adviser for Revisions' OR status=''
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  //fetch facility request org
  app.get("/facilityrequestorg", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM facilityrequest WHERE status != 'Approved by GBM'";
 // WHERE status='Returned By Adviser for Revisions' OR status=''
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

//view facility
app.get("/facilityrequestgbm", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM facilityrequest WHERE status='Approved by GBM'";
  
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


//gbm list
  app.get("/facilityrequestall", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM facilityrequest WHERE status='Approved by Adviser' OR status='Returned by GBM for Revisions'";
  
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

//adviser returned
 app.post("/adviserreturned/:faci_id", async (req, res) => {
    try {
        // Generate new comment_key
        const prosKeyQuery = 'SELECT MAX(CAST(comment_key AS UNSIGNED)) AS max_comment_key FROM commentsfaci';
        const prosKeyResult = await query(prosKeyQuery);
        const maxProsKey = prosKeyResult[0].max_comment_key || 0;
        const finalProsKey = maxProsKey + 1; // Ensure it's a number

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'

        // Extract faci_id from request params
        const faci_id = req.params.faci_id;

        // Update the accomplishment status
        const updateQuery = "UPDATE facilityrequest SET status = 'Returned by Adviser for Revisions' WHERE faci_id = ?";
        await db.query(updateQuery, [faci_id]);

        // Insert comment into commentsreps
        const insertQuery = "INSERT INTO commentsfaci (comment_key, faci_id, comment_content, date) VALUES (?, ?, ?, ?)";
        await db.query(insertQuery, [finalProsKey, faci_id, req.body.comment_content, formattedDate]);

        return res.status(200).json({ updated: true });

    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "An error occurred while updating the accomplishment status and inserting the comment." });
    }
});

//adviser approved
app.put("/adviserapproved/:faci_id", (req, res) => {
    const q = "UPDATE facilityrequest SET status = 'Approved by Adviser' WHERE faci_id = ?";
    const faci_id = req.params.faci_id;
  
    db.query(q, [faci_id], (err, result) => {
      if (err) return res.json("Error");
      return res.json({ updated: true });
    });
  });

  //gbm returned
  app.post("/gbmreturned/:faci_id", async (req, res) => {
    try {
        // Generate new comment_key
        const prosKeyQuery = 'SELECT MAX(CAST(comment_key AS UNSIGNED)) AS max_comment_key FROM commentsfaci';
        const prosKeyResult = await query(prosKeyQuery);
        const maxProsKey = prosKeyResult[0].max_comment_key || 0;
        const finalProsKey = maxProsKey + 1; // Ensure it's a number

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'

        // Extract faci_id from request params
        const faci_id = req.params.faci_id;

        // Update the accomplishment status
        const updateQuery = "UPDATE facilityrequest SET status = 'Returned by GBM for Revisions' WHERE faci_id = ?";
        await db.query(updateQuery, [faci_id]);

        // Insert comment into commentsreps
        const insertQuery = "INSERT INTO commentsfaci (comment_key, faci_id, comment_content, date) VALUES (?, ?, ?, ?)";
        await db.query(insertQuery, [finalProsKey, faci_id, req.body.comment_content, formattedDate]);

        return res.status(200).json({ updated: true });

    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "An error occurred while updating the accomplishment status and inserting the comment." });
    }
});
//gbm approved
app.put("/gbmapproved/:faci_id", (req, res) => {
    const q = "UPDATE facilityrequest SET status = 'Approved by GBM' WHERE faci_id = ?";
    const faci_id = req.params.faci_id;
  
    db.query(q, [faci_id], (err, result) => {
      if (err) return res.json("Error");
      return res.json({ updated: true });
    });
  });

//get gbm
app.get("/gbm", (req, res) => {
    const q = "SELECT * FROM `gbm`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching gbm:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

  //DSA returned accomplishment
  app.post("/dsareturned/:reps_id", async (req, res) => {
    try {
        // Generate new comment_key
        const prosKeyQuery = 'SELECT MAX(CAST(comment_key AS UNSIGNED)) AS max_comment_key FROM commentsreps';
        const prosKeyResult = await query(prosKeyQuery);
        const maxProsKey = prosKeyResult[0].max_comment_key || 0;
        const finalProsKey = maxProsKey + 1; // Ensure it's a number

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'

        // Extract reps_id from request params
        const reps_id = req.params.reps_id;

        // Update the accomplishment status
        const updateQuery = "UPDATE accomplishment SET status = 'Returned by OSA Director for Revisions' WHERE reps_id = ?";
        await db.query(updateQuery, [reps_id]);

        // Insert comment into commentsreps
        const insertQuery = "INSERT INTO commentsreps (comment_key, reps_id, comment_content, date) VALUES (?, ?, ?, ?)";
        await db.query(insertQuery, [finalProsKey, reps_id, req.body.comment_content, formattedDate]);

        return res.status(200).json({ updated: true });

    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "An error occurred while updating the accomplishment status and inserting the comment." });
    }
});

//fetch comments from DSA
app.get("/commentsreps", (req, res) => {
    const q = "SELECT * FROM `commentsreps`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching Comments:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

//fetch comments from adviser
app.get("/commentsfaci", (req, res) => {
    const q = "SELECT * FROM `commentsfaci`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching Comments:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});


//DSA approved
app.put("/dsaapproved/:reps_id", (req, res) => {
    const q = "UPDATE accomplishment SET status = 'Approved by OSA Director' WHERE reps_id = ?";
    const reps_id = req.params.reps_id;
  
    db.query(q, [reps_id], (err, result) => {
      if (err) return res.json("Error");
      return res.json({ updated: true });
    });
  });


  //submit accomplishment reports
  app.post("/accomplishment", upload.fields([
    { name: "evalfiles", maxCount: 10 },
    { name: "documentation", maxCount: 10 }
]), async (req, res) => {
    try {
        // Handle files and map to filenames
        const evalfiles1 = req.files && req.files["evalfiles"] ? req.files["evalfiles"].map(file => file.filename) : [];
        const documentations = req.files && req.files["documentation"] ? req.files["documentation"].map(file => file.filename) : [];

        // Generate new ID
        const prosKeyQuery = 'SELECT MAX(CAST(reps_id AS UNSIGNED)) AS max_reps_id FROM accomplishment';
        const prosKeyResult = await query(prosKeyQuery);
        const maxProsKey = prosKeyResult[0].max_reps_id || 0;
        const finalProsKey = maxProsKey + 1; // Ensure it's a number

        // SQL Query
        const q = `
            INSERT INTO accomplishment (reps_id, org_id, reqdep, title, participants, proponents, theme, duration, 
            planning, during, after, resultseval, evalfiles, documentation) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Values in correct order
        const values = [
            finalProsKey,  // Ensure this matches the first field (reps_id)
            req.body.org_id,
            req.body.reqdep,
            req.body.title,
            req.body.participants,
            req.body.proponents,
            req.body.theme,
            req.body.duration,
            req.body.planning,
            req.body.during,
            req.body.after,
            req.body.resultseval,
            JSON.stringify(evalfiles1), // Convert array to JSON string
            JSON.stringify(documentations) // Convert array to JSON string
        ];

        // Execute the query
        db.query(q, values, (err, data) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while inserting data into the database" });
            }
            return res.status(200).json({ message: "Data inserted successfully", reps_id: finalProsKey });
        });

    } catch (error) {
        console.error("Error handling request:", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
});

//update accomplishment report
app.put("/updateaccomplishment/:reps_id", upload.fields([
    { name: "evalfiles", maxCount: 10 },
    { name: "documentation", maxCount: 10 }
]), async (req, res) => {
    try {
        const reps_id = req.params.reps_id;

        // Retrieve existing files from DB
        const getExistingFilesQuery = `SELECT evalfiles, documentation FROM accomplishment WHERE reps_id = ?`;
        const existingFiles = await query(getExistingFilesQuery, [reps_id]);

        let oldEvalFiles = [];
        let oldDocumentation = [];

        if (existingFiles.length > 0) {
            oldEvalFiles = JSON.parse(existingFiles[0].evalfiles || "[]");
            oldDocumentation = JSON.parse(existingFiles[0].documentation || "[]");
        }

        // Check if new files are uploaded
        const newEvalFiles = req.files["evalfiles"] ? req.files["evalfiles"].map(file => file.filename) : [];
        const newDocumentation = req.files["documentation"] ? req.files["documentation"].map(file => file.filename) : [];

        // Merge old and new files
        const finalEvalFiles = [...oldEvalFiles, ...newEvalFiles];
        const finalDocumentation = [...oldDocumentation, ...newDocumentation];

        // Prepare SQL query for updating
        const q = `
            UPDATE accomplishment 
            SET org_id = ?, reqdep = ?, title = ?, participants = ?, proponents = ?, theme = ?, 
                duration = ?, planning = ?, during = ?, after = ?, resultseval = ?, 
                evalfiles = ?, documentation = ? 
            WHERE reps_id = ?;
        `;

        const values = [
            req.body.org_id || null,
            req.body.reqdep || null,
            req.body.title || null,
            req.body.participants || null,
            req.body.proponents || null,
            req.body.theme || null,
            req.body.duration || null,
            req.body.planning || null,
            req.body.during || null,
            req.body.after || null,
            req.body.resultseval || null,
            JSON.stringify(finalEvalFiles), 
            JSON.stringify(finalDocumentation), 
            reps_id
        ];

        // Execute the SQL query
        db.query(q, values, (err, data) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while updating the data" });
            }
            return res.status(200).json({ message: "Accomplishment updated successfully", reps_id });
        });

    } catch (error) {
        console.error("Error handling request:", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
});


//get accomplishment bbs
app.get("/accomplishment", (req, res) => {
    const q = "SELECT * FROM `accomplishment`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching accomplishment:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
//fetch accomplishment
//accomplishment report form fetching
app.get("/accomplishment/:reps_id", (req, res) => {
    const { reps_id } = req.params;
    const q = "SELECT * FROM accomplishment WHERE reps_id = ?"; // Adjust query as needed
  
    db.query(q, [reps_id], (err, data) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Database query error" });
      }
  
      if (data.length === 0) {
        return res.status(404).json({ message: "No images found for the given ID" });
      }
  /*
      const response = data.map((row) => ({
        evalfiles: row.evalfiles?.replace(/[\[\]"]/g, ""),
        documentation: row.documentation?.replace(/[\[\]"]/g, ""),
      })); */
  
     // return res.json(response); 
      return res.json(data) ; // Return multiple records as an array
    });
  }); 


// API Endpoint to store financial data
//const util = require("util"); // Import util for promisifying db.query

app.post("/uploadFinancialData", upload.fields([{ name: "financialfiles", maxCount: 10 }]), async (req, res) => {
    try {
        if (!db) throw new Error("Database connection not initialized");

        // Convert db.query() into a promise for cleaner async/await
        const queryAsync = util.promisify(db.query).bind(db);

        // Extract uploaded files
        const financialfiles1 = req.files?.["financialfiles"]?.map(file => file.filename) || [];

        // Parse request body (Fix JSON issue)
        let { org_id, reqdep, title, source, data, date, total, remaining } = req.body;

        // Ensure `data` is properly parsed if it's a string
        if (typeof data === "string") {
            data = JSON.parse(data);
        }

        // Default `remaining` if missing
        remaining = remaining ?? 0;

        // Validate required fields
        if (!org_id || !reqdep || !title || !source) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ error: "No financial data received" });
        }

        // Generate a unique group ID (using UNIX timestamp)
        const groupId = Date.now();

        // Query to get the max fr_id
        const maxProsKeyResult = await queryAsync("SELECT MAX(CAST(fr_id AS UNSIGNED)) AS max_fr_id FROM financial_records");
        let maxProsKey = maxProsKeyResult[0]?.max_fr_id || 0;

        // SQL query with source field
        const sql = `INSERT INTO financial_records 
                    (fr_id, org_id, group_id, reqdep, title, source, item, description, amount, date, total, remaining, financialfiles) 
                    VALUES ?`;

        // Format values correctly and assign unique `fr_id` for each row
        const values = data.map((row) => {
            maxProsKey += 1; // Increment ID for each row
            return [
                maxProsKey,
                org_id,
                groupId,
                reqdep,
                title,
                source,
                row.item || "",
                row.description || "",
                row.amount || 0,
                date,
                total,
                remaining,
                JSON.stringify(financialfiles1) // Store filenames as JSON
            ];
        });

        // Insert into database
        await queryAsync(sql, [values]);

        res.status(200).json({ message: "Data successfully stored" });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "An error occurred while inserting data", details: err.message });
    }
});

app.put("/updateFinancialData/:group_id", upload.fields([{ name: "financialfiles", maxCount: 10 }]), async (req, res) => {
    try {
        if (!db) throw new Error("Database connection not initialized");

        const queryAsync = util.promisify(db.query).bind(db);
        const group_id = req.params.group_id;

        // Retrieve existing files from DB
        const getExistingFilesQuery = `SELECT financialfiles FROM financial_records WHERE group_id = ?`;
        const existingFiles = await query(getExistingFilesQuery, [group_id]);

        let oldfinancialfiles = [];

        if (existingFiles.length > 0) {
            oldfinancialfiles = JSON.parse(existingFiles[0].financialfiles || "[]");
       
        }
 // Check if new files are uploaded
 const newfinancialfiles = req.files["financialfiles"] ? req.files["financialfiles"].map(file => file.filename) : [];

   // Merge old and new files
   const finalfinancialfiles = [...oldfinancialfiles, ...newfinancialfiles];

        // Extract uploaded files
       // const financialfiles1 = req.files?.["financialfiles"]?.map(file => file.filename) || [];
        

        // Parse request body
        let { org_id, reqdep, title, source, data, date, total, remaining } = req.body;

        // Parse `data` if it's sent as a string
        if (typeof data === "string") {
            data = JSON.parse(data);
        }

        // Default `remaining` if missing
        remaining = remaining ?? 0;

        // Validate required fields
        if (!org_id || !reqdep || !title || !source) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ error: "No financial data received" });
        }

        // Query to get the max fr_id (for inserting new rows)
        const maxProsKeyResult = await queryAsync("SELECT MAX(CAST(fr_id AS UNSIGNED)) AS max_fr_id FROM financial_records");
        let maxProsKey = maxProsKeyResult[0]?.max_fr_id || 0;

        // Process each row (update existing, insert new)
        for (const row of data) {
            if (row.fr_id) {
                // Update existing row
                const updateSQL = `UPDATE financial_records 
                                   SET org_id = ?, reqdep = ?, title = ?, source = ?, item = ?, description = ?, amount = ?, date = ?, total = ?, remaining = ?, financialfiles = ?
                                   WHERE group_id = ? AND fr_id = ?`;

                const updateValues = [
                    org_id,
                    reqdep,
                    title,
                    source,
                    row.item || "",
                    row.description || "",
                    row.amount || 0,
                    date,
                    total,
                    remaining,
                    finalfinancialfiles.length > 0 ? JSON.stringify(finalfinancialfiles) : row.financialfiles,
                    group_id,
                    row.fr_id
                ];

                await queryAsync(updateSQL, updateValues);
            } else {
                // Insert new row
                maxProsKey += 1; // Generate new fr_id for the new row
                const insertSQL = `INSERT INTO financial_records 
                                   (fr_id, org_id, group_id, reqdep, title, source, item, description, amount, date, total, remaining, financialfiles) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                const insertValues = [
                    maxProsKey,
                    org_id,
                    group_id,
                    reqdep,
                    title,
                    source,
                    row.item || "",
                    row.description || "",
                    row.amount || 0,
                    date,
                    total,
                    remaining,
                    JSON.stringify(finalfinancialfiles)
                ];

                await queryAsync(insertSQL, insertValues);
            }
        }

        res.status(200).json({ message: "Data successfully updated" });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "An error occurred while updating data", details: err.message });
    }
});


//delete eval files from accomplishment
app.delete("/deleteimage2/:reps_id/:imageName", (req, res) => {
    const { reps_id, imageName } = req.params;

    // Fetch existing evalfiles JSON
    const selectQuery = "SELECT evalfiles FROM accomplishment WHERE reps_id = ?";
    
    db.query(selectQuery, [reps_id], (err, results) => {
        if (err) {
            console.error("Error fetching files:", err);
            return res.status(500).json({ error: "Failed to retrieve files" });
        }

        if (results.length === 0 || !results[0]) {
            return res.status(404).json({ error: "No record found for the given reps_id" });
        }

        let evalfiles = JSON.parse(results[0].evalfiles || "[]");

        // Remove the specific image
        evalfiles = evalfiles.filter(file => file !== imageName);


        // Remove the specific image
       // const newEvalFiles = evalfiles.filter(file => file !== imageName);

        // Update the database
        const updateQuery = "UPDATE accomplishment SET evalfiles = ? WHERE reps_id = ?";
        db.query(updateQuery, [JSON.stringify(evalfiles), reps_id], (err, updateResult) => {
            if (err) {
                console.error("Error updating evalfiles:", err);
                return res.status(500).json({ error: "Failed to update evalfiles" });
            }

         /*   // Delete the actual file from the server
            const filePath = path.join(__dirname, "uploads", imageName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Deletes the file
                console.log("File deleted:", imageName);
            } else {
                console.warn("File not found on server:", imageName);
            } */

            res.status(200).json({ message: "Image deleted successfully" });
        });
    });
});

//delete documentation from accomplishment
app.delete("/deleteimage3/:reps_id/:imageName", (req, res) => {
    const { reps_id, imageName } = req.params;

    // Fetch existing documentation JSON
    const selectQuery = "SELECT documentation FROM accomplishment WHERE reps_id = ?";
    
    db.query(selectQuery, [reps_id], (err, results) => {
        if (err) {
            console.error("Error fetching documentation files:", err);
            return res.status(500).json({ error: "Failed to retrieve documentation files" });
        }

        if (results.length === 0 || !results[0]) {
            return res.status(404).json({ error: "No record found for the given reps_id" });
        }

        let documentation = [];

        // Parse JSON safely
        try {
            documentation = results[0].documentation ? JSON.parse(results[0].documentation) : [];
        } catch (parseError) {
            console.error("Error parsing documentation JSON:", parseError);
            return res.status(500).json({ error: "Error parsing JSON data from the database" });
        }

        // Remove the specific image
        const newDocumentation = documentation.filter(file => file !== imageName);

        // Update the database
        const updateQuery = "UPDATE accomplishment SET documentation = ? WHERE reps_id = ?";
        db.query(updateQuery, [JSON.stringify(newDocumentation), reps_id], (err, updateResult) => {
            if (err) {
                console.error("Error updating documentation:", err); // ✅ Fixed incorrect log message
                return res.status(500).json({ error: "Failed to update documentation" });
            }

          /*  // Delete the actual file from the server
            const filePath = path.join(__dirname, "uploads", imageName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Deletes the file
                console.log("File deleted:", imageName);
            } else {
                console.warn("File not found on server:", imageName);
            } */

            res.status(200).json({ message: "Image deleted successfully" });
        });
    });
});


//get financial reports
app.get("/financialreports", (req, res) => {
    const q = "SELECT * FROM `financial_records`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching financial:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

//get financial reports comments
app.get("/commentsfinancial", (req, res) => {
    const q = "SELECT * FROM `commentsfinancial`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching financial:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});


  // API Endpoint to get financial data by group_id
app.get("/getFinancialDatafiles/:group_id", (req, res) => {
    const { group_id } = req.params;
  
    const sql = "SELECT * FROM financial_records WHERE group_id = ?";
    db.query(sql, [group_id], (err, result) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(result); // Send the data as JSON
    });
  });

  // API Endpoint to get financial data by group_id
app.get("/getFinancialData/:group_id", (req, res) => {
    const { group_id } = req.params;
  
    const sql = "SELECT * FROM financial_records WHERE group_id = ?";
    db.query(sql, [group_id], (err, result) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(result); // Send the data as JSON
    });
  });


  //DSA returned financial
  app.post("/dsareturned2/:fr_id", async (req, res) => {
    try {
        // Generate new comment_key
        const prosKeyQuery = 'SELECT MAX(CAST(comment_key AS UNSIGNED)) AS max_comment_key FROM commentsfinancial';
        const prosKeyResult = await query(prosKeyQuery);
        const maxProsKey = prosKeyResult[0].max_comment_key || 0;
        const finalProsKey = maxProsKey + 1; // Ensure it's a number

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'

        // Extract reps_id from request params
        const fr_id = req.params.fr_id;

        // Update the accomplishment status
        const updateQuery = "UPDATE financial_records SET status = 'Returned by OSA Director for Revisions' WHERE fr_id = ?";
        await db.query(updateQuery, [fr_id]);

        // Insert comment into commentsreps
        const insertQuery = "INSERT INTO commentsfinancial (comment_key, fr_id, comment_content, date) VALUES (?, ?, ?, ?)";
        await db.query(insertQuery, [finalProsKey, fr_id, req.body.comment_content, formattedDate]);

        return res.status(200).json({ updated: true });

    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "An error occurred while updating the accomplishment status and inserting the comment." });
    }
});

//DSA approved
app.put("/dsaapproved2/:fr_id", (req, res) => {
    const q = "UPDATE financial_records SET status = 'Approved by OSA Director' WHERE fr_id = ?";
    const fr_id = req.params.fr_id;
  
    db.query(q, [fr_id], (err, result) => {
      if (err) return res.json("Error");
      return res.json({ updated: true });
    });
  });


  //Delete fetched image
  app.delete("/deleteimage/:group_id/:imageName", (req, res) => {
    const { group_id, imageName } = req.params;

    // Fetch existing financialfiles JSON
    const selectQuery = "SELECT financialfiles FROM financial_records WHERE group_id = ?";
    
    db.query(selectQuery, [group_id], (err, results) => {
        if (err) {
            console.error("Error fetching financial files:", err);
            return res.status(500).json({ error: "Failed to retrieve financial files" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No record found for the given group_id" });
        }

        let financialfiles = JSON.parse(results[0].financialfiles || "[]");

        // Remove the specific image
        financialfiles = financialfiles.filter(file => file !== imageName);

        // Update the record in the database
        const updateQuery = "UPDATE financial_records SET financialfiles = ? WHERE group_id = ?";
        db.query(updateQuery, [JSON.stringify(financialfiles), group_id], (err, updateResult) => {
            if (err) {
                console.error("Error updating financial files:", err);
                return res.status(500).json({ error: "Failed to update financial files" });
            }

            res.status(200).json({ message: "Image deleted successfully" });
        });
    });
});



// DAN'S BACKEND

const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(uploadsDir)); // Serve files from the uploads folder

app.get("/applications", (req, res) => {
    const q = "SELECT * FROM `applications`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching applications:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/applications_documents", (req, res) => {
    const q = "SELECT * FROM `applications_documents`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching applications documents:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.post('/appformsubmit', upload.array('documents'), async (req, res) => {
    const { stud_id, application_sem, application_sy, application_class, control_no } = req.body;
    const files = req.files;
  
    const insertApplication = async (control_no) => {
      const date_submitted = new Date().toISOString().split('T')[0];
      const application_status = 'Pending';
      const q = "INSERT INTO applications (control_no, stud_id, application_sem, application_sy, application_class, date_submitted, application_status) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [control_no, stud_id, application_sem, application_sy, application_class, date_submitted, application_status];
      await db.query(q, values);
    };

    const docKeyQuery = 'SELECT MAX(CAST(SUBSTRING(docu_key, 6) AS UNSIGNED)) AS max_docu_key FROM applications_documents';
    const docKeyResult = await query(docKeyQuery);
    const maxDocKey = docKeyResult[0]?.max_docu_key || 0;
  
    const insertDocuments = async (control_no, files) => {
      const docValues = files.map((file, index) => [
        `docu_${maxDocKey + index + 1}`, control_no, file.filename
      ]);
      console.log('Document Values:', docValues); // Log the docValues array
      const q = "INSERT INTO applications_documents (docu_key, control_no, docu_path) VALUES ?";
      await db.query(q, [docValues]);
    };
  
    try {
      await insertApplication(control_no);
      if (files && files.length > 0) {
        await insertDocuments(control_no, files);
      }
      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.error("Duplicate entry error:", err);
        res.status(409).json({ error: "Duplicate entry error. Please try again." });
      } else {
        console.error("Error submitting application:", err);
        res.status(500).json({ error: "Failed to submit application" });
      }
    }
  });

app.post('/update-application/:control_no', upload.array('documents'), async (req, res) => {
    const { control_no } = req.params;
    const { stud_id, application_sem, application_sy, application_class } = req.body;
    const files = req.files;

    try {
        const date_submitted = new Date().toISOString().split('T')[0];
        const application_status = 'Pending';

        const q = "UPDATE applications SET stud_id = ?, application_sem = ?, application_sy = ?, application_class = ?, date_submitted = ?, application_status = ?, on_revision = FALSE WHERE control_no = ?";
        const values = [stud_id, application_sem, application_sy, application_class, date_submitted, application_status, control_no];
        await db.query(q, values);

        if (files && files.length > 0) {
            const docKeyQuery = 'SELECT MAX(CAST(SUBSTRING(docu_key, 6) AS UNSIGNED)) AS max_docu_key FROM applications_documents';
            const docKeyResult = await query(docKeyQuery);
            const maxDocKey = docKeyResult[0]?.max_docu_key || 0;

            const docValues = files.map((file, index) => [
                `docu_${maxDocKey + index + 1}`, control_no, file.filename
            ]);

            const insertDocumentsQuery = "INSERT INTO applications_documents (docu_key, control_no, docu_path) VALUES ?";
            await db.query(insertDocumentsQuery, [docValues]);
        }

        res.status(200).json({ message: 'Application updated successfully' });
    } catch (err) {
        console.error(`Error updating application: ${err}`);
        res.status(500).json({ error: 'Failed to update application' });
    }
});
  
app.delete('/applications_documents/:docu_key', async (req, res) => {
    const { docu_key } = req.params;
  
    try {
      const q = "DELETE FROM applications_documents WHERE docu_key = ?";
      await db.query(q, [docu_key]);
  
      res.status(200).json({ message: 'Document deleted successfully' });
    } catch (err) {
      console.error(`Error deleting document: ${err}`);
      res.status(500).json({ error: 'Failed to delete document' });
    }
  });

  app.delete('/applications/:control_no', async (req, res) => {
    const { control_no } = req.params;
  
    try {
      const q = "DELETE FROM applications WHERE control_no = ?";
      await db.query(q, [control_no]);
  
      res.status(200).json({ message: 'Application deleted successfully' });
    } catch (err) {
      console.error(`Error deleting application: ${err}`);
      res.status(500).json({ error: 'Failed to delete application' });
    }
  });
  

  // Approve Application
app.put('/applications/approve/:control_no', async (req, res) => {
    const { control_no } = req.params;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // format the date as needed
  
    try {
      // Update the application status to 'Approved'
      const updateQuery = "UPDATE applications SET application_status = 'Approved', date_approved = ? WHERE control_no = ?";
      await query(updateQuery, [formattedDate, control_no]);
  
      res.status(200).json({ message: "Application approved successfully" });
    } catch (err) {
      console.error("Error approving application:", err);
      res.status(500).json({ error: "Failed to approve application" });
    }
  });
  
  // Reject Application
  app.post('/applications/reject/:control_no', async (req, res) => {
    const { control_no } = req.params;
    const { comment } = req.body;
  
    try {
      // Update the application status to 'Rejected', set on_revision to TRUE, and add the comment
      const updateQuery = "UPDATE applications SET application_status = 'Rejected', on_revision = TRUE, comment = ? WHERE control_no = ?";
      await query(updateQuery, [comment, control_no]);
  
      res.status(200).json({ message: "Application rejected and comment added successfully" });
    } catch (err) {
      console.error("Error rejecting application:", err);
      res.status(500).json({ error: "Failed to reject application" });
    }
  });
  




app.put("/applicationmng/update", upload.array('documents'), (req, res) => {
    const { controlNo, applicationClass } = req.body;

    // Step 1: Update application class in the database
    const applicationQ = `
        UPDATE usams.applications 
        SET applicationClass = ? 
        WHERE controlNo = ?
    `;
    const applicationValues = [applicationClass, controlNo];

    db.query(applicationQ, applicationValues, (err) => {
        if (err) {
            console.error('Error updating application class:', err);
            return res.status(500).json(err);
        }

        // Step 2: Fetch old documents for deletion
        const deleteQ = "SELECT document_path FROM usams.documents WHERE controlNo = ?";
        db.query(deleteQ, [controlNo], (err, results) => {
            if (err) {
                console.error('Error fetching old documents:', err);
                return res.status(500).json(err);
            }

            // Step 3: Delete files from the filesystem
            const deletePromises = results.map(doc => {
                return new Promise((resolve, reject) => {
                    fs.unlink(doc.document_path, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                            return reject(err);
                        }
                        resolve();
                    });
                });
            });

            Promise.all(deletePromises)
                .then(() => {
                    // Step 4: Delete old documents from the database
                    const deleteDocsQ = "DELETE FROM usams.documents WHERE controlNo = ?";
                    db.query(deleteDocsQ, [controlNo], (err) => {
                        if (err) {
                            console.error('Error deleting old documents from DB:', err);
                            return res.status(500).json(err);
                        }

                        // Step 5: Insert new documents if uploaded
                        const insertDocumentsPromises = req.files.map(file => {
                            const documentPath = file.path;
                            const documentName = file.originalname;
                            const documentType = file.mimetype;
                            const documentSize = file.size;

                            return new Promise((resolve, reject) => {
                                const q = `
                                    INSERT INTO usams.documents (controlNo, document_path, document_name, document_type, document_size) 
                                    VALUES (?, ?, ?, ?, ?)
                                `;
                                const values = [controlNo, documentPath, documentName, documentType, documentSize];

                                db.query(q, values, (err) => {
                                    if (err) {
                                        console.error('Error inserting new document:', err);
                                        return reject(err);
                                    }
                                    resolve();
                                });
                            });
                        });

                        Promise.all(insertDocumentsPromises)
                            .then(() => {
                                console.log('Application class has been updated with new documents');
                                res.json({ message: "Application class has been updated" });
                            })
                            .catch(err => {
                                console.error('Error inserting new documents:', err);
                                res.status(500).json(err);
                            });
                    });
                })
                .catch(err => {
                    console.error('Error deleting files:', err);
                    res.status(500).json(err);
                });
        });
    });
});

// Download file endpoint
app.get("/download/:controlNo", (req, res) => {
    const controlNo = req.params.controlNo;
    const query = "SELECT document_path FROM usams.documents WHERE controlNo = ?";

    db.query(query, [controlNo], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: "File not found" });
        }

        const filePath = results[0].document_path; // Assuming you're downloading the first document
        res.download(filePath, (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).send("Could not download the file.");
            }
        });
    });
});


// Fetch applications with document names
app.get("/applicationmng", (req, res) => {
    const q = "SELECT * FROM usams.applications"; // Adjust this query if necessary
    db.query(q, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results); // Return all application results
    });

   
});



// RENAN'S BACKEND

app.get("/accreditations", (req, res) => {
    const q = "SELECT * FROM `accreditation`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching accreditation:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/activities", (req, res) => {
    const q = "SELECT * FROM `activities`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching activities:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.get("/members-accred", (req, res) => {
    const q = "SELECT * FROM `members_accred`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching members:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.post('/accreditation/add', upload.fields([
    { name: 'constitution', maxCount: 1 },
    { name: 'adv_letter', maxCount: 1 },
    { name: 'appendices', maxCount: 1 }
  ]), async (req, res) => {
    const {
      orgname,
      type,
      members,
      officers,
      activities
    } = req.body;
  
    const constitution = req.files['constitution'][0];
    const adv_letter = req.files['adv_letter'][0];
    const appendices = req.files['appendices'][0];
  
    try {
      // Generate unique acc_id
      const accIdQuery = 'SELECT MAX(CAST(SUBSTRING(acc_id, 5) AS UNSIGNED)) AS max_acc_id FROM accreditation';
      const accIdResult = await query(accIdQuery);
      const maxAccId = accIdResult[0].max_acc_id || 0;
      let finalAccId = `acc_${maxAccId + 1}`;
  
      // Check for duplicate acc_id
      while (true) {
        const checkAccIdQuery = 'SELECT COUNT(*) AS count FROM accreditation WHERE acc_id = ?';
        const checkAccIdResult = await query(checkAccIdQuery, [finalAccId]);
        if (checkAccIdResult[0].count === 0) break;
        finalAccId = `acc_${maxAccId + 1 + Math.floor(Math.random() * 100)}`;
      }
  
      // Log the received data for debugging
      console.log("Received data:", req.body);

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // format the date as needed
  
      // Insert into accreditation table
      const accreditationQuery = `
        INSERT INTO accreditation (
          acc_id, stud_id, constitution, orgname, type, adv_letter, appendices, status, date_submitted
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const accreditationValues = [
        finalAccId, req.body.stud_id, constitution.filename, orgname, type, adv_letter.filename, appendices.filename, 'Pending', formattedDate
      ];
  
      await query(accreditationQuery, accreditationValues);
      console.log("Accreditation added:", finalAccId);
  
      // Insert members
      const parsedMembers = JSON.parse(members);
      const membersValues = [];
  
      if (parsedMembers && parsedMembers.length > 0) {
        for (let index = 0; index < parsedMembers.length; index++) {
          let memberId = `mem_${index + 1}`;
          while (true) {
            const checkMemberIdQuery = 'SELECT COUNT(*) AS count FROM members_accred WHERE member_id = ?';
            const checkMemberIdResult = await query(checkMemberIdQuery, [memberId]);
            if (checkMemberIdResult[0].count === 0) break;
            memberId = `mem_${index + 1 + Math.floor(Math.random() * 100)}`;
          }
  
          membersValues.push([
            memberId, parsedMembers[index].stud_id, finalAccId, parsedMembers[index].member_email, parsedMembers[index].member_name, parsedMembers[index].member_position || null, parsedMembers[index].member_contact
          ]);
        }
  
        const membersQuery = "INSERT INTO members_accred (member_id, stud_id, acc_id, member_email, member_name, member_position, member_contact) VALUES ?";
        await query(membersQuery, [membersValues]);
        console.log("Members added:", membersValues.length);
      }
  
      // Insert officers
      const parsedOfficers = JSON.parse(officers);
      const officersValues = [];
  
      if (parsedOfficers && parsedOfficers.length > 0) {
        for (let index = 0; index < parsedOfficers.length; index++) {
          let officerId = `off_${index + 1}`;
          while (true) {
            const checkOfficerIdQuery = 'SELECT COUNT(*) AS count FROM members_accred WHERE member_id = ?';
            const checkOfficerIdResult = await query(checkOfficerIdQuery, [officerId]);
            if (checkOfficerIdResult[0].count === 0) break;
            officerId = `off_${index + 1 + Math.floor(Math.random() * 100)}`;
          }
  
          officersValues.push([
            officerId, parsedMembers[index].stud_id, finalAccId, parsedOfficers[index].member_email, parsedOfficers[index].member_name, parsedOfficers[index].member_position, parsedOfficers[index].member_contact
          ]);
        }
  
        const officersQuery = "INSERT INTO members_accred (member_id, stud_id, acc_id, member_email, member_name, member_position, member_contact) VALUES ?";
        await query(officersQuery, [officersValues]);
        console.log("Officers added:", officersValues.length);
      }
  
      // Insert activities
      const parsedActivities = JSON.parse(activities);
      const activitiesValues = [];
  
      if (parsedActivities && parsedActivities.length > 0) {
        for (let index = 0; index < parsedActivities.length; index++) {
          let activityId = `act_${index + 1}`;
          while (true) {
            const checkActivityIdQuery = 'SELECT COUNT(*) AS count FROM activities WHERE act_id = ?';
            const checkActivityIdResult = await query(checkActivityIdQuery, [activityId]);
            if (checkActivityIdResult[0].count === 0) break;
            activityId = `act_${index + 1 + Math.floor(Math.random() * 100)}`;
          }
  
          activitiesValues.push([
            activityId, finalAccId, parsedActivities[index].act_name, parsedActivities[index].outcomes, parsedActivities[index].time, parsedActivities[index].target_group, parsedActivities[index].persons
          ]);
        }
  
        const activitiesQuery = "INSERT INTO activities (act_id, acc_id, act_name, outcomes, time, target_group, persons) VALUES ?";
        await query(activitiesQuery, [activitiesValues]);
        console.log("Activities added:", activitiesValues.length);
      }
  
      return res.json({ acc_id: finalAccId, ...req.body });
    } catch (err) {
      console.error("Error adding accreditation:", err);
      return res.status(500).json({ error: "Failed to add accreditation" });
    }
  });

   //DSA returned accreditation
   app.post("/accreditationreturned/:acc_id", async (req, res) => {
    try {
        // Generate new comment_key
        const prosKeyQuery = 'SELECT MAX(CAST(comment_key AS UNSIGNED)) AS max_comment_key FROM commentsaccreditation';
        const prosKeyResult = await query(prosKeyQuery);
        const maxProsKey = prosKeyResult[0].max_comment_key || 0;
        const finalProsKey = maxProsKey + 1; // Ensure it's a number

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'

        // Extract acc_id from request params
        const acc_id = req.params.acc_id;

        // Update the accomplishment status
        const updateQuery = "UPDATE accreditation SET status = 'Returned by OSA Director for Revisions' WHERE acc_id = ?";
        await db.query(updateQuery, [acc_id]);

        // Insert comment into commentsreps
        const insertQuery = "INSERT INTO commentsaccreditation (comment_key, acc_id, comment_content, date) VALUES (?, ?, ?, ?)";
        await db.query(insertQuery, [finalProsKey, acc_id, req.body.comment_content, formattedDate]);

        return res.status(200).json({ updated: true });

    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "An error occurred while updating the accomplishment status and inserting the comment." });
    }
});

//get accreditation comments
app.get("/comments-accreditation", (req, res) => {
    const q = "SELECT * FROM `commentsaccreditation`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching financial:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

//approval
//DSA approved
app.put("/accreditation-approved/:acc_id", (req, res) => {
    const q = "UPDATE accreditation SET status = 'Approved by OSA Director' WHERE acc_id = ?";
    const acc_id = req.params.acc_id;
  
    db.query(q, [acc_id], (err, result) => {
      if (err) return res.json("Error");
      return res.json({ updated: true });
    });
  });
  

// updating accreditation appllcation
  app.post('/accreditation/update/:acc_id', upload.fields([
    { name: 'constitution', maxCount: 1 },
    { name: 'adv_letter', maxCount: 1 },
    { name: 'appendices', maxCount: 1 }
  ]), async (req, res) => {
    const { acc_id } = req.params;
    const {
      orgname,
      type,
      members,
      officers,
      activities
    } = req.body;
  
    // Check if new files are uploaded, otherwise use existing file names
    const constitution = req.files['constitution']?.[0]?.filename || req.body.constitution;
    const adv_letter = req.files['adv_letter']?.[0]?.filename || req.body.adv_letter;
    const appendices = req.files['appendices']?.[0]?.filename || req.body.appendices;    
  
    try {
      // Update accreditation record
      const updateAccreditationQuery = `
        UPDATE accreditation
        SET orgname = ?, type = ?,
            constitution = ?, adv_letter = ?, appendices = ?
        WHERE acc_id = ?
      `;
      const updateAccreditationValues = [
        orgname, type,
        constitution,
        adv_letter,
        appendices,
        acc_id
      ];
  
      await query(updateAccreditationQuery, updateAccreditationValues);
  
      // Update members
      const parsedMembers = JSON.parse(members);
      const membersValues = [];
  
      if (parsedMembers && parsedMembers.length > 0) {
        for (let index = 0; index < parsedMembers.length; index++) {
          const member = parsedMembers[index];
          if (member.member_id) {
            // Update existing member
            const updateMemberQuery = `
              UPDATE members_accred
              SET stud_id = ?, member_email = ?, member_name = ?, member_position = ?, member_contact = ?
              WHERE member_id = ?
            `;
            const updateMemberValues = [
              member.stud_id, member.member_email, member.member_name, member.member_position || null, member.member_contact, member.member_id
            ];
            await query(updateMemberQuery, updateMemberValues);
          } else {
            // Insert new member
            let memberId = `mem_${index + 1}`;
            while (true) {
              const checkMemberIdQuery = 'SELECT COUNT(*) AS count FROM members_accred WHERE member_id = ?';
              const checkMemberIdResult = await query(checkMemberIdQuery, [memberId]);
              if (checkMemberIdResult[0].count === 0) break;
              memberId = `mem_${index + 1 + Math.floor(Math.random() * 100)}`;
            }
            membersValues.push([
              memberId, member.stud_id, acc_id, member.member_email, member.member_name, member.member_position || null, member.member_contact
            ]);
          }
        }
  
        if (membersValues.length > 0) {
          const insertMembersQuery = "INSERT INTO members_accred (member_id, stud_id, acc_id, member_email, member_name, member_position, member_contact) VALUES ?";
          await query(insertMembersQuery, [membersValues]);
        }
      }
  
      // Update officers
      const parsedOfficers = JSON.parse(officers);
      const officersValues = [];
  
      if (parsedOfficers && parsedOfficers.length > 0) {
        for (let index = 0; index < parsedOfficers.length; index++) {
          const officer = parsedOfficers[index];
          if (officer.member_id) {
            // Update existing officer
            const updateOfficerQuery = `
              UPDATE members_accred
              SET stud_id = ?, member_email = ?, member_name = ?, member_position = ?, member_contact = ?
              WHERE member_id = ?
            `;
            const updateOfficerValues = [
              officer.stud_id, officer.member_email, officer.member_name, officer.member_position, officer.member_contact, officer.member_id
            ];
            await query(updateOfficerQuery, updateOfficerValues);
          } else {
            // Insert new officer
            let officerId = `off_${index + 1}`;
            while (true) {
              const checkOfficerIdQuery = 'SELECT COUNT(*) AS count FROM members_accred WHERE member_id = ?';
              const checkOfficerIdResult = await query(checkOfficerIdQuery, [officerId]);
              if (checkOfficerIdResult[0].count === 0) break;
              officerId = `off_${index + 1 + Math.floor(Math.random() * 100)}`;
            }
            officersValues.push([
              officerId, officer.stud_id, acc_id, officer.member_email, officer.member_name, officer.member_position, officer.member_contact
            ]);
          }
        }
  
        if (officersValues.length > 0) {
          const insertOfficersQuery = "INSERT INTO members_accred (member_id, stud_id, acc_id, member_email, member_name, member_position, member_contact) VALUES ?";
          await query(insertOfficersQuery, [officersValues]);
        }
      }
  
      // Update activities
      const parsedActivities = JSON.parse(activities);
      const activitiesValues = [];
  
      if (parsedActivities && parsedActivities.length > 0) {
        for (let index = 0; index < parsedActivities.length; index++) {
          const activity = parsedActivities[index];
          if (activity.act_id) {
            // Update existing activity
            const updateActivityQuery = `
              UPDATE activities
              SET act_name = ?, outcomes = ?, time = ?, target_group = ?, persons = ?
              WHERE act_id = ?
            `;
            const updateActivityValues = [
              activity.act_name, activity.outcomes, activity.time, activity.target_group, activity.persons, activity.act_id
            ];
            await query(updateActivityQuery, updateActivityValues);
          } else {
            // Insert new activity
            let activityId = `act_${index + 1}`;
            while (true) {
              const checkActivityIdQuery = 'SELECT COUNT(*) AS count FROM activities WHERE act_id = ?';
              const checkActivityIdResult = await query(checkActivityIdQuery, [activityId]);
              if (checkActivityIdResult[0].count === 0) break;
              activityId = `act_${index + 1 + Math.floor(Math.random() * 100)}`;
            }
            activitiesValues.push([
              activityId, acc_id, activity.act_name, activity.outcomes, activity.time, activity.target_group, activity.persons
            ]);
          }
        }
  
        if (activitiesValues.length > 0) {
          const insertActivitiesQuery = "INSERT INTO activities (act_id, acc_id, act_name, outcomes, time, target_group, persons) VALUES ?";
          await query(insertActivitiesQuery, [activitiesValues]);
        }
      }
  
      return res.json({ acc_id, ...req.body });
    } catch (err) {
      console.error("Error updating accreditation:", err);
      return res.status(500).json({ error: "Failed to update accreditation" });
    }
  });
  

  // deleting members and officers from update accreditation application
  app.delete('/members-accred/:member_id', async (req, res) => {
    const { member_id } = req.params;
    try {
      const deleteMemberQuery = 'DELETE FROM members_accred WHERE member_id = ?';
      await query(deleteMemberQuery, [member_id]);
      res.json({ message: 'Member deleted successfully' });
    } catch (err) {
      console.error('Error deleting member:', err);
      res.status(500).json({ error: 'Failed to delete member' });
    }
  });
  
    // deleting activities from update accreditation application
  app.delete('/activities/:act_id', async (req, res) => {
    const { act_id } = req.params;
    try {
      const deleteActivityQuery = 'DELETE FROM activities WHERE act_id = ?';
      await query(deleteActivityQuery, [act_id]);
      res.json({ message: 'Activity deleted successfully' });
    } catch (err) {
      console.error('Error deleting activity:', err);
      res.status(500).json({ error: 'Failed to delete activity' });
    }
  });
  
//reaccreditation add
app.post('/reaccreditation/add', upload.fields([
   
  { name: 'adv_letter', maxCount: 1 },
  { name: 'appendices', maxCount: 1 }
]), async (req, res) => {
  const {
    orgname,
    type,
    members,
    officers,
    activities
  } = req.body;

  
  const adv_letter = req.files['adv_letter'][0];
  const appendices = req.files['appendices'][0];

  try {
    // Generate unique acc_id
    const accIdQuery = 'SELECT MAX(CAST(SUBSTRING(acc_id, 5) AS UNSIGNED)) AS max_acc_id FROM reaccreditation';
    const accIdResult = await query(accIdQuery);
    const maxAccId = accIdResult[0].max_acc_id || 0;
    let finalAccId = `acc_${maxAccId + 1}`;

    // Check for duplicate acc_id
    while (true) {
      const checkAccIdQuery = 'SELECT COUNT(*) AS count FROM reaccreditation WHERE acc_id = ?';
      const checkAccIdResult = await query(checkAccIdQuery, [finalAccId]);
      if (checkAccIdResult[0].count === 0) break;
      finalAccId = `acc_${maxAccId + 1 + Math.floor(Math.random() * 100)}`;
    }

    // Log the received data for debugging
    console.log("Received data:", req.body);

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // format the date as needed

    // Insert into reaccreditation table
    const accreditationQuery = `
      INSERT INTO reaccreditation (
        acc_id, org_id, orgname, type, adv_letter, appendices, status, date_submitted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const accreditationValues = [
      finalAccId, req.body.orgId, orgname, type, adv_letter.filename, appendices.filename, 'Pending', formattedDate
    ];

    await query(accreditationQuery, accreditationValues);
    console.log("Reaccreditation added:", finalAccId);

    // Insert members
    const parsedMembers = JSON.parse(members);
    const membersValues = [];

    if (parsedMembers && parsedMembers.length > 0) {
      for (let index = 0; index < parsedMembers.length; index++) {
        let memberId = `mem_${index + 1}`;
        while (true) {
          const checkMemberIdQuery = 'SELECT COUNT(*) AS count FROM members_reaccred WHERE member_id = ?';
          const checkMemberIdResult = await query(checkMemberIdQuery, [memberId]);
          if (checkMemberIdResult[0].count === 0) break;
          memberId = `mem_${index + 1 + Math.floor(Math.random() * 100)}`;
        }

        membersValues.push([
          memberId, parsedMembers[index].stud_id, finalAccId, parsedMembers[index].member_email, parsedMembers[index].member_name, parsedMembers[index].member_position || null, parsedMembers[index].member_contact
        ]);
      }

      const membersQuery = "INSERT INTO members_reaccred (member_id, stud_id, acc_id, member_email, member_name, member_position, member_contact) VALUES ?";
      await query(membersQuery, [membersValues]);
      console.log("Members added:", membersValues.length);
    }

    // Insert officers
    const parsedOfficers = JSON.parse(officers);
    const officersValues = [];

    if (parsedOfficers && parsedOfficers.length > 0) {
      for (let index = 0; index < parsedOfficers.length; index++) {
        let officerId = `off_${index + 1}`;
        while (true) {
          const checkOfficerIdQuery = 'SELECT COUNT(*) AS count FROM members_reaccred WHERE member_id = ?';
          const checkOfficerIdResult = await query(checkOfficerIdQuery, [officerId]);
          if (checkOfficerIdResult[0].count === 0) break;
          officerId = `off_${index + 1 + Math.floor(Math.random() * 100)}`;
        }

        officersValues.push([
          officerId, parsedMembers[index].stud_id, finalAccId, parsedOfficers[index].member_email, parsedOfficers[index].member_name, parsedOfficers[index].member_position, parsedOfficers[index].member_contact
        ]);
      }

      const officersQuery = "INSERT INTO members_reaccred (member_id, stud_id, acc_id, member_email, member_name, member_position, member_contact) VALUES ?";
      await query(officersQuery, [officersValues]);
      console.log("Officers added:", officersValues.length);
    }

    // Insert activities
    const parsedActivities = JSON.parse(activities);
    const activitiesValues = [];

    if (parsedActivities && parsedActivities.length > 0) {
      for (let index = 0; index < parsedActivities.length; index++) {
        let activityId = `act_${index + 1}`;
        while (true) {
          const checkActivityIdQuery = 'SELECT COUNT(*) AS count FROM activities_reaccred WHERE act_id = ?';
          const checkActivityIdResult = await query(checkActivityIdQuery, [activityId]);
          if (checkActivityIdResult[0].count === 0) break;
          activityId = `act_${index + 1 + Math.floor(Math.random() * 100)}`;
        }

        activitiesValues.push([
          activityId, finalAccId, parsedActivities[index].act_name, parsedActivities[index].outcomes, parsedActivities[index].time, parsedActivities[index].target_group, parsedActivities[index].persons
        ]);
      }

      const activitiesQuery = "INSERT INTO activities_reaccred (act_id, acc_id, act_name, outcomes, time, target_group, persons) VALUES ?";
      await query(activitiesQuery, [activitiesValues]);
      console.log("Activities added:", activitiesValues.length);
    }

    return res.json({ acc_id: finalAccId, ...req.body });
  } catch (err) {
    console.error("Error adding accreditation:", err);
    return res.status(500).json({ error: "Failed to add accreditation" });
  }
});


// updating reaccreditation application
app.post('/reaccreditation/update/:acc_id', upload.fields([
 
  { name: 'adv_letter', maxCount: 1 },
  { name: 'appendices', maxCount: 1 }
]), async (req, res) => {
  const { acc_id } = req.params;
  const {
    orgname,
    type,
    members,
    officers,
    activities
  } = req.body;

  // Check if new files are uploaded, otherwise use existing file names

  const adv_letter = req.files['adv_letter']?.[0]?.filename || req.body.adv_letter;
  const appendices = req.files['appendices']?.[0]?.filename || req.body.appendices;    

  try {
    // Update accreditation record
    const updateAccreditationQuery = `
      UPDATE reaccreditation
      SET orgname = ?, type = ?,
           adv_letter = ?, appendices = ?
      WHERE acc_id = ?
    `;
    const updateAccreditationValues = [
      orgname, type,
      adv_letter,
      appendices,
      acc_id
    ];

    await query(updateAccreditationQuery, updateAccreditationValues);

    // Update members
    const parsedMembers = JSON.parse(members);
    const membersValues = [];

    if (parsedMembers && parsedMembers.length > 0) {
      for (let index = 0; index < parsedMembers.length; index++) {
        const member = parsedMembers[index];
        if (member.member_id) {
          // Update existing member
          const updateMemberQuery = `
            UPDATE members_reaccred
            SET stud_id = ?, member_email = ?, member_name = ?, member_position = ?, member_contact = ?
            WHERE member_id = ?
          `;
          const updateMemberValues = [
            member.stud_id, member.member_email, member.member_name, member.member_position || null, member.member_contact, member.member_id
          ];
          await query(updateMemberQuery, updateMemberValues);
        } else {
          // Insert new member
          let memberId = `mem_${index + 1}`;
          while (true) {
            const checkMemberIdQuery = 'SELECT COUNT(*) AS count FROM members_reaccred WHERE member_id = ?';
            const checkMemberIdResult = await query(checkMemberIdQuery, [memberId]);
            if (checkMemberIdResult[0].count === 0) break;
            memberId = `mem_${index + 1 + Math.floor(Math.random() * 100)}`;
          }
          membersValues.push([
            memberId, member.stud_id, acc_id, member.member_email, member.member_name, member.member_position || null, member.member_contact
          ]);
        }
      }

      if (membersValues.length > 0) {
        const insertMembersQuery = "INSERT INTO members_reaccred (member_id, stud_id, acc_id, member_email, member_name, member_position, member_contact) VALUES ?";
        await query(insertMembersQuery, [membersValues]);
      }
    }

    // Update officers
    const parsedOfficers = JSON.parse(officers);
    const officersValues = [];

    if (parsedOfficers && parsedOfficers.length > 0) {
      for (let index = 0; index < parsedOfficers.length; index++) {
        const officer = parsedOfficers[index];
        if (officer.member_id) {
          // Update existing officer
          const updateOfficerQuery = `
            UPDATE members_reaccred
            SET stud_id = ?, member_email = ?, member_name = ?, member_position = ?, member_contact = ?
            WHERE member_id = ?
          `;
          const updateOfficerValues = [
            officer.stud_id, officer.member_email, officer.member_name, officer.member_position, officer.member_contact, officer.member_id
          ];
          await query(updateOfficerQuery, updateOfficerValues);
        } else {
          // Insert new officer
          let officerId = `off_${index + 1}`;
          while (true) {
            const checkOfficerIdQuery = 'SELECT COUNT(*) AS count FROM members_reaccred WHERE member_id = ?';
            const checkOfficerIdResult = await query(checkOfficerIdQuery, [officerId]);
            if (checkOfficerIdResult[0].count === 0) break;
            officerId = `off_${index + 1 + Math.floor(Math.random() * 100)}`;
          }
          officersValues.push([
            officerId, officer.stud_id, acc_id, officer.member_email, officer.member_name, officer.member_position, officer.member_contact
          ]);
        }
      }

      if (officersValues.length > 0) {
        const insertOfficersQuery = "INSERT INTO members_reaccred (member_id, stud_id, acc_id, member_email, member_name, member_position, member_contact) VALUES ?";
        await query(insertOfficersQuery, [officersValues]);
      }
    }

    // Update activities
    const parsedActivities = JSON.parse(activities);
    const activitiesValues = [];

    if (parsedActivities && parsedActivities.length > 0) {
      for (let index = 0; index < parsedActivities.length; index++) {
        const activity = parsedActivities[index];
        if (activity.act_id) {
          // Update existing activity
          const updateActivityQuery = `
            UPDATE activities_reaccred
            SET act_name = ?, outcomes = ?, time = ?, target_group = ?, persons = ?
            WHERE act_id = ?
          `;
          const updateActivityValues = [
            activity.act_name, activity.outcomes, activity.time, activity.target_group, activity.persons, activity.act_id
          ];
          await query(updateActivityQuery, updateActivityValues);
        } else {
          // Insert new activity
          let activityId = `act_${index + 1}`;
          while (true) {
            const checkActivityIdQuery = 'SELECT COUNT(*) AS count FROM activities_reaccred WHERE act_id = ?';
            const checkActivityIdResult = await query(checkActivityIdQuery, [activityId]);
            if (checkActivityIdResult[0].count === 0) break;
            activityId = `act_${index + 1 + Math.floor(Math.random() * 100)}`;
          }
          activitiesValues.push([
            activityId, acc_id, activity.act_name, activity.outcomes, activity.time, activity.target_group, activity.persons
          ]);
        }
      }

      if (activitiesValues.length > 0) {
        const insertActivitiesQuery = "INSERT INTO activities_reaccred (act_id, acc_id, act_name, outcomes, time, target_group, persons) VALUES ?";
        await query(insertActivitiesQuery, [activitiesValues]);
      }
    }

    return res.json({ acc_id, ...req.body });
  } catch (err) {
    console.error("Error updating accreditation:", err);
    return res.status(500).json({ error: "Failed to update accreditation" });
  }
});

app.get("/reaccreditations", (req, res) => {
  const q = "SELECT * FROM `reaccreditation`";
  db.query(q, (err, data) => {
      if (err) {
          console.error("Error fetching accreditation:", err);
          return res.status(500).json(err);
      }
      return res.json(data);
  });
});

app.get("/activities_reaccred", (req, res) => {
  const q = "SELECT * FROM `activities_reaccred`";
  db.query(q, (err, data) => {
      if (err) {
          console.error("Error fetching activities:", err);
          return res.status(500).json(err);
      }
      return res.json(data);
  });
});

app.get("/members-reaccred", (req, res) => {
  const q = "SELECT * FROM `members_reaccred`";
  db.query(q, (err, data) => {
      if (err) {
          console.error("Error fetching members:", err);
          return res.status(500).json(err);
      }
      return res.json(data);
  });
});

// deleting members and officers from update accreditation application
app.delete('/members-reaccred/:member_id', async (req, res) => {
  const { member_id } = req.params;
  try {
    const deleteMemberQuery = 'DELETE FROM members_reaccred WHERE member_id = ?';
    await query(deleteMemberQuery, [member_id]);
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    console.error('Error deleting member:', err);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

  // deleting activities from update accreditation application
app.delete('/activities_reaccred/:act_id', async (req, res) => {
  const { act_id } = req.params;
  try {
    const deleteActivityQuery = 'DELETE FROM activities_reaccred WHERE act_id = ?';
    await query(deleteActivityQuery, [act_id]);
    res.json({ message: 'Activity deleted successfully' });
  } catch (err) {
    console.error('Error deleting activity:', err);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

//DSA returned reaccreditation
app.post("/reccreditationreturned/:acc_id", async (req, res) => {
  try {
      // Generate new comment_key
      const prosKeyQuery = 'SELECT MAX(CAST(comment_key AS UNSIGNED)) AS max_comment_key FROM comments_reaccreditation';
      const prosKeyResult = await query(prosKeyQuery);
      const maxProsKey = prosKeyResult[0].max_comment_key || 0;
      const finalProsKey = maxProsKey + 1; // Ensure it's a number

      // Get the current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'

      // Extract acc_id from request params
      const acc_id = req.params.acc_id;

      // Update the accomplishment status
      const updateQuery = "UPDATE reaccreditation SET status = 'Returned by OSA Director for Revisions' WHERE acc_id = ?";
      await db.query(updateQuery, [acc_id]);

      // Insert comment into commentsreps
      const insertQuery = "INSERT INTO comments_reaccreditation (comment_key, acc_id, comment_content, date) VALUES (?, ?, ?, ?)";
      await db.query(insertQuery, [finalProsKey, acc_id, req.body.comment_content, formattedDate]);

      return res.status(200).json({ updated: true });

  } catch (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "An error occurred while updating the accomplishment status and inserting the comment." });
  }
});

//get reaccreditation comments
app.get("/comments-reaccreditation", (req, res) => {
const q = "SELECT * FROM `comments_reaccreditation`";
db.query(q, (err, data) => {
    if (err) {
        console.error("Error fetching financial:", err);
        return res.status(500).json(err);
    }
    return res.json(data);
});
});

//DSA approved
app.put("/reaccreditation-approved/:acc_id", (req, res) => {
const q = "UPDATE reaccreditation SET status = 'Approved by OSA Director' WHERE acc_id = ?";
const acc_id = req.params.acc_id;

db.query(q, [acc_id], (err, result) => {
  if (err) return res.json("Error");
  return res.json({ updated: true });
});
});

//add inputs into accomplishment
app.post("/accomplishment/add", upload.fields([
  { name: "evalfiles", maxCount: 10 },
  { name: "documentation", maxCount: 10 },
  { name: "financialfiles", maxCount: 10 }
]), async (req, res) => {
  try {
      // Handle files and map to filenames
      const evalfiles1 = req.files?.["evalfiles"]?.map(file => file.filename) || [];
      const documentations = req.files?.["documentation"]?.map(file => file.filename) || [];
      const financialfiles = req.files?.["financialfiles"]?.map(file => file.filename) || [];

      // Generate new ID for accomplishment
      const prosKeyQuery = 'SELECT MAX(CAST(reps_id AS UNSIGNED)) AS max_reps_id FROM accomplishment';
      const prosKeyResult = await query(prosKeyQuery);
      const maxProsKey = prosKeyResult[0]?.max_reps_id || 0;
      const finalProsKey = maxProsKey + 1; // Ensure it's a number

      // Check if `records` exists in `req.body`
      let parsedRecords = [];
      if (req.body.records) {
          try {
              parsedRecords = JSON.parse(req.body.records);
          } catch (error) {
              return res.status(400).json({ error: "Invalid records JSON format" });
          }
      }

      // SQL Query for Accomplishment
      const q = `
          INSERT INTO accomplishment (reps_id, org_id, reqdep, title, participants, proponents, theme, duration, 
          planning, during, after, resultseval, evalfiles, documentation, source, total, remaining, financialfiles) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Values for Accomplishment
      const values = [
          finalProsKey,  
          req.body.org_id,
          req.body.reqdep,
          req.body.title,
          req.body.participants,
          req.body.proponents,
          req.body.theme,
          req.body.duration,
          req.body.planning,
          req.body.during,
          req.body.after,
          req.body.resultseval,
          JSON.stringify(evalfiles1), 
          JSON.stringify(documentations),
          req.body.source,
          req.body.total,
          req.body.remaining,
          JSON.stringify(financialfiles)
      ];

      // Execute the Accomplishment query
      await query(q, values);

      // Insert expenses into `financial_records`
      if (parsedRecords.length > 0) {
          // Get the latest `fr_id` from financial_records
          const frKeyQuery = "SELECT MAX(CAST(fr_id AS UNSIGNED)) AS max_fr_id FROM financial_records";
          const frKeyResult = await query(frKeyQuery);
          let maxFrKey = frKeyResult[0]?.max_fr_id || 0; // Start from 0 if no records exist

          const recordsValues = parsedRecords.map(record => {
              maxFrKey += 1; // Increment for each record
              return [maxFrKey, finalProsKey, record.item, record.description, record.amount];
          });

          const recordsQuery = "INSERT INTO financial_records (fr_id, reps_id, item, description, amount) VALUES ?";
          await query(recordsQuery, [recordsValues]);

          console.log("Record added:", recordsValues.length);
      }

      return res.status(200).json({ message: "Data inserted successfully", reps_id: finalProsKey });

  } catch (error) {
      console.error("Error handling request:", error);
      return res.status(500).json({ error: "An unexpected error occurred" });
  }
});


//update accomplishment
app.post("/accomplishment/update/:reps_id", upload.fields([
    { name: "evalfiles", maxCount: 10 },
    { name: "documentation", maxCount: 10 },
    { name: "financialfiles", maxCount: 10 }
]), async (req, res) => {
    try {
        const repsId = req.params.reps_id; 

        // Validate required fields
        const { org_id, reqdep, title, participants, proponents, theme, duration, planning, during, 
            after, resultseval, source, total, remaining, records } = req.body;

        if (!title || !theme || !participants || !duration) {
            return res.status(400).json({ error: "Missing required fields: title, theme, participants, duration" });
        }

        // Fetch existing files from the database
        const getExistingFilesQuery = `SELECT evalfiles, documentation, financialfiles FROM accomplishment WHERE reps_id = ?`;
        const existingFilesResult = await query(getExistingFilesQuery, [repsId]);

        if (existingFilesResult.length === 0) {
            return res.status(404).json({ error: "Record not found" });
        }

        // Parse existing files
        const existingFiles = existingFilesResult[0];
        const oldEvalFiles = existingFiles.evalfiles ? JSON.parse(existingFiles.evalfiles) : [];
        const oldDocumentation = existingFiles.documentation ? JSON.parse(existingFiles.documentation) : [];
        const oldFinancialFiles = existingFiles.financialfiles ? JSON.parse(existingFiles.financialfiles) : [];

        // Handle uploaded files
        const newEvalFiles = req.files?.["evalfiles"]?.map(file => file.filename) || [];
        const newDocumentation = req.files?.["documentation"]?.map(file => file.filename) || [];
        const newFinancialFiles = req.files?.["financialfiles"]?.map(file => file.filename) || [];

        // Merge old and new files
        const finalEvalFiles = [...oldEvalFiles, ...newEvalFiles];
        const finalDocumentation = [...oldDocumentation, ...newDocumentation];
        const finalFinancialFiles = [...oldFinancialFiles, ...newFinancialFiles];

        // Update the Accomplishment record
        const updateQuery = `
            UPDATE accomplishment 
            SET org_id = ?, reqdep = ?, title = ?, participants = ?, proponents = ?, theme = ?, duration = ?, 
                planning = ?, during = ?, after = ?, resultseval = ?, evalfiles = ?, documentation = ?, 
                source = ?, total = ?, remaining = ?, financialfiles = ? 
            WHERE reps_id = ?
        `;

        const updateValues = [
            org_id, reqdep, title, participants, proponents, theme, duration, 
            planning, during, after, resultseval, JSON.stringify(finalEvalFiles), 
            JSON.stringify(finalDocumentation), source, total, remaining, JSON.stringify(finalFinancialFiles),
            repsId
        ];

        await query(updateQuery, updateValues);

        // Update financial records
        let parsedRecords = [];
        try {
            parsedRecords = JSON.parse(records);
        } catch (e) {
            return res.status(400).json({ error: "Invalid records format" });
        }

        const recordsValues = [];
        if (parsedRecords.length > 0) {
            for (let index = 0; index < parsedRecords.length; index++) {
                const record = parsedRecords[index];
                if (record.fr_id) {
                    // Update existing record
                    const updaterecordQuery = `
                        UPDATE financial_records 
                        SET item = ?, description = ?, amount = ? 
                        WHERE fr_id = ? 
                    `;
                    const updaterecordValues = [
                        record.item, record.description, record.amount, record.fr_id
                    ];
                    await query(updaterecordQuery, updaterecordValues);
                } else {
                    // Generate unique recordId
                    let recordId = `${index + 1}`;
                    while (true) {
                        const checkrecordIdQuery = 'SELECT COUNT(*) AS count FROM financial_records WHERE fr_id = ?';
                        const checkrecordIdResult = await query(checkrecordIdQuery, [recordId]);
                        if (checkrecordIdResult[0].count === 0) break;
                        recordId = `${index + 1 + Math.floor(Math.random() * 100)}`;
                    }
                    recordsValues.push([recordId, repsId, record.item, record.description, record.amount]);
                }
            }

            if (recordsValues.length > 0) {
                const placeholders = recordsValues.map(() => "(?, ?, ?, ?, ?)").join(", ");
                const insertrecordsQuery = `INSERT INTO financial_records (fr_id, reps_id, item, description, amount) VALUES ${placeholders}`;
                await query(insertrecordsQuery, recordsValues.flat());
            }
        }

        return res.json({ repsId, ...req.body });

    } catch (error) {
        console.error("Error handling request:", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
});

//get financial records
app.get("/financial_records/fetch/:reps_id", (req, res) => {
    const { reps_id } = req.params;
    const q = "SELECT * FROM financial_records WHERE reps_id = ?";
    db.query(q, [reps_id], (err, data) => {
        if (err) {
          console.error("Error fetching data:", err);
          return res.status(500).json({ error: "Database query error" });
        }
    
        if (data.length === 0) {
          return res.status(404).json({ message: "No images found for the given ID" });
        }
  
        return res.json(data) ; // Return multiple records as an array
      });
});

//delete financial files from accomplishment
app.delete("/deleteimage4/:reps_id/:imageName", (req, res) => {
    const { reps_id, imageName } = req.params;

    // Fetch existing evalfiles JSON
    const selectQuery = "SELECT financialfiles FROM accomplishment WHERE reps_id = ?";
    
    db.query(selectQuery, [reps_id], (err, results) => {
        if (err) {
            console.error("Error fetching files:", err);
            return res.status(500).json({ error: "Failed to retrieve files" });
        }

        if (results.length === 0 || !results[0]) {
            return res.status(404).json({ error: "No record found for the given reps_id" });
        }

        let financialfiles = JSON.parse(results[0].financialfiles || "[]");

        // Remove the specific image
        financialfiles = financialfiles.filter(file => file !== imageName);


        // Remove the specific image
       // const newEvalFiles = evalfiles.filter(file => file !== imageName);

        // Update the database
        const updateQuery = "UPDATE accomplishment SET financialfiles = ? WHERE reps_id = ?";
        db.query(updateQuery, [JSON.stringify(financialfiles), reps_id], (err, updateResult) => {
            if (err) {
                console.error("Error updating evalfiles:", err);
                return res.status(500).json({ error: "Failed to update evalfiles" });
            }

         /*   // Delete the actual file from the server
            const filePath = path.join(__dirname, "uploads", imageName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Deletes the file
                console.log("File deleted:", imageName);
            } else {
                console.warn("File not found on server:", imageName);
            } */

            res.status(200).json({ message: "Image deleted successfully" });
        });
    });
});

app.delete('/financial_records/:fr_id', async (req, res) => {
    const { fr_id } = req.params;

    // Validate input
    if (!fr_id) {
        return res.status(400).json({ error: "Invalid request: fr_id is required" });
    }

    try {
        const deleteMemberQuery = 'DELETE FROM financial_records WHERE fr_id = ?';
        const result = await query(deleteMemberQuery, [fr_id]);

        // Check if a record was actually deleted
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Record not found" });
        }

        res.json({ message: 'Data deleted successfully' });
    } catch (err) {
        console.error('Error deleting financial record:', err);
        res.status(500).json({ error: 'Failed to delete record' });
    }
});





//get accomplishment bbs
app.get("/accomplishment", (req, res) => {
    const q = "SELECT * FROM `accomplishment`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching accomplishment:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});
//fetch accomplishment
//accomplishment report form fetching
app.get("/accomplishment/:reps_id", (req, res) => {
    const { reps_id } = req.params;
    const q = "SELECT * FROM accomplishment WHERE reps_id = ?"; // Adjust query as needed
  
    db.query(q, [reps_id], (err, data) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Database query error" });
      }
  
      if (data.length === 0) {
        return res.status(404).json({ message: "No images found for the given ID" });
      }
  /*
      const response = data.map((row) => ({
        evalfiles: row.evalfiles?.replace(/[\[\]"]/g, ""),
        documentation: row.documentation?.replace(/[\[\]"]/g, ""),
      })); */
  
     // return res.json(response); 
      return res.json(data) ; // Return multiple records as an array
    });
  }); 

  app.get("/conducted/activities", (req, res) => {
    const q = "SELECT * FROM `proposals` WHERE status ='Fully Approved'";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching Proposals:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

  




//delete eval files from accomplishment
app.delete("/deleteimage2/:reps_id/:imageName", (req, res) => {
    const { reps_id, imageName } = req.params;

    // Fetch existing evalfiles JSON
    const selectQuery = "SELECT evalfiles FROM accomplishment WHERE reps_id = ?";
    
    db.query(selectQuery, [reps_id], (err, results) => {
        if (err) {
            console.error("Error fetching files:", err);
            return res.status(500).json({ error: "Failed to retrieve files" });
        }

        if (results.length === 0 || !results[0]) {
            return res.status(404).json({ error: "No record found for the given reps_id" });
        }

        let evalfiles = JSON.parse(results[0].evalfiles || "[]");

        // Remove the specific image
        evalfiles = evalfiles.filter(file => file !== imageName);


        // Remove the specific image
       // const newEvalFiles = evalfiles.filter(file => file !== imageName);

        // Update the database
        const updateQuery = "UPDATE accomplishment SET evalfiles = ? WHERE reps_id = ?";
        db.query(updateQuery, [JSON.stringify(evalfiles), reps_id], (err, updateResult) => {
            if (err) {
                console.error("Error updating evalfiles:", err);
                return res.status(500).json({ error: "Failed to update evalfiles" });
            }

         /*   // Delete the actual file from the server
            const filePath = path.join(__dirname, "uploads", imageName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Deletes the file
                console.log("File deleted:", imageName);
            } else {
                console.warn("File not found on server:", imageName);
            } */

            res.status(200).json({ message: "Image deleted successfully" });
        });
    });
});

//delete documentation from accomplishment
app.delete("/deleteimage3/:reps_id/:imageName", (req, res) => {
    const { reps_id, imageName } = req.params;

    // Fetch existing documentation JSON
    const selectQuery = "SELECT documentation FROM accomplishment WHERE reps_id = ?";
    
    db.query(selectQuery, [reps_id], (err, results) => {
        if (err) {
            console.error("Error fetching documentation files:", err);
            return res.status(500).json({ error: "Failed to retrieve documentation files" });
        }

        if (results.length === 0 || !results[0]) {
            return res.status(404).json({ error: "No record found for the given reps_id" });
        }

        let documentation = [];

        // Parse JSON safely
        try {
            documentation = results[0].documentation ? JSON.parse(results[0].documentation) : [];
        } catch (parseError) {
            console.error("Error parsing documentation JSON:", parseError);
            return res.status(500).json({ error: "Error parsing JSON data from the database" });
        }

        // Remove the specific image
        const newDocumentation = documentation.filter(file => file !== imageName);

        // Update the database
        const updateQuery = "UPDATE accomplishment SET documentation = ? WHERE reps_id = ?";
        db.query(updateQuery, [JSON.stringify(newDocumentation), reps_id], (err, updateResult) => {
            if (err) {
                console.error("Error updating documentation:", err); // ✅ Fixed incorrect log message
                return res.status(500).json({ error: "Failed to update documentation" });
            }

          /*  // Delete the actual file from the server
            const filePath = path.join(__dirname, "uploads", imageName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Deletes the file
                console.log("File deleted:", imageName);
            } else {
                console.warn("File not found on server:", imageName);
            } */

            res.status(200).json({ message: "Image deleted successfully" });
        });
    });
});

//delete eval files from accomplishment
app.delete("/deleteimage4/:reps_id/:imageName", (req, res) => {
    const { reps_id, imageName } = req.params;

    // Fetch existing evalfiles JSON
    const selectQuery = "SELECT financialfiles FROM accomplishment WHERE reps_id = ?";
    
    db.query(selectQuery, [reps_id], (err, results) => {
        if (err) {
            console.error("Error fetching files:", err);
            return res.status(500).json({ error: "Failed to retrieve files" });
        }

        if (results.length === 0 || !results[0]) {
            return res.status(404).json({ error: "No record found for the given reps_id" });
        }

        let financialfiles = JSON.parse(results[0].financialfiles || "[]");

        // Remove the specific image
        financialfiles = financialfiles.filter(file => file !== imageName);


        // Remove the specific image
       // const newEvalFiles = evalfiles.filter(file => file !== imageName);

        // Update the database
        const updateQuery = "UPDATE accomplishment SET financialfiles = ? WHERE reps_id = ?";
        db.query(updateQuery, [JSON.stringify(financialfiles), reps_id], (err, updateResult) => {
            if (err) {
                console.error("Error updating evalfiles:", err);
                return res.status(500).json({ error: "Failed to update evalfiles" });
            }

         /*   // Delete the actual file from the server
            const filePath = path.join(__dirname, "uploads", imageName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Deletes the file
                console.log("File deleted:", imageName);
            } else {
                console.warn("File not found on server:", imageName);
            } */

            res.status(200).json({ message: "Image deleted successfully" });
        });
    });
});





//DSA approved
app.put("/dsaapproved/:reps_id", (req, res) => {
    const q = "UPDATE accomplishment SET status = 'Approved by OSA Director' WHERE reps_id = ?";
    const reps_id = req.params.reps_id;
  
    db.query(q, [reps_id], (err, result) => {
      if (err) return res.json("Error");
      return res.json({ updated: true });
    });
  });

//DSA returned accomplishment
  app.post("/dsareturned/:reps_id", async (req, res) => {
    try {
        // Generate new comment_key
        const prosKeyQuery = 'SELECT MAX(CAST(comment_key AS UNSIGNED)) AS max_comment_key FROM commentsreps';
        const prosKeyResult = await query(prosKeyQuery);
        const maxProsKey = prosKeyResult[0].max_comment_key || 0;
        const finalProsKey = maxProsKey + 1; // Ensure it's a number

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'

        // Extract reps_id from request params
        const reps_id = req.params.reps_id;

        // Update the accomplishment status
        const updateQuery = "UPDATE accomplishment SET status = 'Returned by OSA Director for Revisions' WHERE reps_id = ?";
        await db.query(updateQuery, [reps_id]);

        // Insert comment into commentsreps
        const insertQuery = "INSERT INTO commentsreps (comment_key, reps_id, comment_content, date) VALUES (?, ?, ?, ?)";
        await db.query(insertQuery, [finalProsKey, reps_id, req.body.comment_content, formattedDate]);

        return res.status(200).json({ updated: true });

    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "An error occurred while updating the accomplishment status and inserting the comment." });
    }
});

//fetch comments from DSA
app.get("/commentsreps", (req, res) => {
    const q = "SELECT * FROM `commentsreps`";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching Comments:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});