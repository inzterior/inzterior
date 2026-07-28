---
name: finance-entry
description: Log an income or expense entry for the Inzterior business into the finance ledger (Google Sheet + local backup), keeping the Overview totals in sync. Use when the user wants to record a payment received, an expense, or asks to "log", "track", or "add" a finance entry for Inzterior.
---

# Inzterior finance entry

Records one or more transactions into the Inzterior finance ledger. There are two copies of the ledger:

- **Google Sheet** (source of truth for viewing) — "Inzterior — Finance Ledger" under `inquiry.guidesbooks@gmail.com`. URL is recorded in `admin/TASKS.md` under Notes — read that file first to get the current URL, don't hardcode it, since it may change.
- **Local backup** — `admin/finance/Inzterior-Finance.xlsx` in this repo. Same three sheets: Overview, Income, Expenses.

## 1. Collect the entry

Ask the user conversationally for whichever fields are missing. Default Date to today if not given.

**Income row** (Income sheet columns A–H): Date, Client, Project, Description, Amount (MYR), Payment Method, Invoice No., Status. Total income (Overview B4) only counts rows where Status = "Paid" — unpaid/invoiced income isn't counted until it's actually received.
**Expense row** (Expenses sheet columns A–I): Date, Category, Vendor, Description, Amount, Currency, Payment Method, Receipt Ref., Reimbursed?

Always ask what **currency** the expense was actually paid in — don't assume MYR. If Fuyi (or anyone other than Inzterior's own account) paid personally because the company bank/card isn't set up yet, record the real currency and amount as charged (for accurate reimbursement), set Payment Method to "Personal (Fuyi) — reimbursement pending", and Reimbursed? to "No". Total expenses (Overview B5) only sums rows where Currency = "MYR" — non-MYR personal-paid expenses are tracked separately via the "Owed to Fuyi" row(s) on Overview instead, keyed by currency (e.g. add a new Overview row per currency as needed: `Owed to Fuyi (<CCY>, pending reimbursement)` = `=SUMIFS(Expenses!E2:E,Expenses!F2:F,"<CCY>",Expenses!I2:I,"No")`). When an owed amount is reimbursed, update the Reimbursed? cell to "Yes" — the formula auto-excludes it.

Support logging multiple entries in one session — keep asking "anything else?" until the user is done.

## 2. Write to the Google Sheet (primary copy)

Use the Claude in Chrome browser tools (load via `ToolSearch` with `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer` if deferred). If the extension isn't connected, tell the user to install/connect it (https://chromewebstore.google.com/detail/fcoeoabgfenejglbffodgkkbkcdhcgfn) and pause — don't silently skip the sync.

1. Navigate to the ledger URL, click the **Income** or **Expenses** tab at the bottom.
2. Click cell A1, then press `ctrl+Down` to jump to the last filled row, then `Down` once more to land on the first empty row.
3. Type the row values as separate `type`/`key:Tab` action pairs per cell (do NOT embed `\t` inside a single `type` string — it does not act as a real Tab keypress and corrupts the row into one cell). End with `key:Return`.
4. **First time only per session**: check the Overview sheet has running-total formulas in column B (click a cell, check the formula bar — a plain `0` with no formula means it hasn't been set up yet). If missing, set:
   - B4: `=SUMIF(Income!H2:H,"Paid",Income!E2:E)`
   - B5: `=SUMIF(Expenses!F2:F,"MYR",Expenses!E2:E)`
   - B6: `=B4-B5`
   These are already set up as of 2026-07-28 — this step is a safety check, not something to redo blindly.

## 3. Mirror to the local backup

Use Desktop Commander (`mcp__Desktop_Commander__read_file` / `write_file`, load via ToolSearch if deferred) to read all three sheets from `admin/finance/Inzterior-Finance.xlsx`, append the new row(s) to the correct sheet in memory, and rewrite the file with the full `{"Overview":[...],"Income":[...],"Expenses":[...]}` JSON — rewriting must include all three sheets each time, or the others get wiped.

## 4. Confirm and flag compliance

Report what was logged and the new running totals (income, expenses, net). If total income is approaching or has crossed RM 500,000 (Malaysia SST registration threshold), flag it explicitly — that's a real compliance trigger, not routine housekeeping. Remind the user only once per session, not on every entry, that receipts/invoices should be kept for 7 years per the Income Tax Act 1967.

Keep the tone brief — this is a bookkeeping utility, not a report.
