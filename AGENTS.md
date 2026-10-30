# [AGENTS.md](http://AGENTS.md)

Keep this file in the root of the repository. Coding agents read it and must follow it. Read it yourself as well: you are responsible for every branch, commit, and pull request the agent creates.

Write branch names, commit messages, and pull requests in English.

## How the agent should work

- When the user requests a new feature or a change, create a new branch before editing files. Skip branch creation only when the user explicitly says not to, or when you are already on a dedicated branch for that work.
- Do not commit, push, or open a pull request unless the student asks.
- Before committing, review `git status` and `git diff` and explain the change in plain language.
- One branch is one task. One commit is one logical change.
- Leave unrelated cleanup out of the branch. If a separate problem shows up, mention it and wait for a new task.
- Do not commit secrets (`.env`, passwords, API keys, tokens) or dependency folders such as `node_modules`.
- Do not rewrite history that has already been pushed. Check the commit message before the commit is created.
- Show the branch name, the commit messages, and the pull request text to the student before finishing.

## Branch names

When you create a branch, start it from an up-to-date default branch (`main`, unless the repository says otherwise) before editing files.

```
type/short-kebab-case-summary
```

Rules:

- Start with one tag from the list below, then `/`.
- Use lowercase words separated by hyphens.
- Describe the change in 2 to 5 words.
- Do not use spaces, underscores, or your name.

| Tag | Use it when |
| --- | --- |
| `feature/` | You add behavior a user can notice |
| `fix/` | You correct something that was wrong |
| `refactor/` | You restructure code and the behavior stays the same |
| `docs/` | You change documentation only |
| `test/` | You add or update tests only |
| `style/` | You change formatting only |
| `chore/` | You change tooling, dependencies, or configuration |

```
feature/product-category-filter
fix/cart-total-with-coupon
refactor/extract-price-formatter
docs/local-setup-steps
```

Avoid names such as `my-branch`, `fix`, `updates`, or `Feature/Add_Filter`.

## Commit messages

Every commit message starts with the same kind of tag, a slash, and a space:

```
type/ imperative summary
```

The tag is a label, not a folder. The summary completes the sentence "this commit will…". Use the base form of the verb: `add`, `fix`, `remove`, `rename`, `extract`.

```
feature/ add a category filter to the product grid
fix/ correct the cart total when a coupon is applied
refactor/ extract the price formatter into its own module
docs/ explain how to run the app locally
```

Rules:

- Put the summary on the first line, around 50 characters.
- Start the summary with a lowercase verb and do not end it with a period.
- Match the tag to that commit. A `feature/` branch can contain a `fix/` commit when that commit only corrects a bug found while building the feature.
- Use a body only when the reason is not obvious. Leave a blank line after the summary, then explain why. Do not paste a list of files; the diff already shows that.
- Prefer a few small commits over one commit that mixes several changes.

```
fix/ correct the cart total when a coupon is applied

The coupon was subtracted once in the line items and again in the
grand total, so the amount due was too low.
```

Avoid messages such as `update`, `fix stuff`, `wip`, or `changes from class`.

## Pull requests

Open a pull request only when the student asks. The title uses the same tag as the branch and describes the whole change:

```
type/ imperative summary
```

```
feature/ add a category filter to the product list
```

Use this body, with these headings, in this order:

```markdown
## What was requested

One or two sentences describing the task in the words of the request.

## What changed

- Concrete change a reviewer can verify.
- Another concrete change.
- Mention a behavior that was intentionally left unchanged when that avoids confusion.

## Implications

Name the shared components, data, types, API calls, or styles that other parts of the app depend on. Say what a teammate must know before changing those pieces. If nothing else is affected, write that explicitly.

## Screenshots

Include before and after screenshots when the user interface changes. Show the desktop layout and a narrow window when the layout can wrap or collapse.

When the interface does not change, write: No user interface changes.

## How to test

- [] Step a classmate can follow without reading the code.
- [] What they should see after that step.
. [] One edge case: empty data, a repeated action, a refresh, or a narrow window.
```

Rules:

- "What changed" is a list of outcomes, not a list of every file.
- "Implications" must say whether shared code was touched. "None" is acceptable only after you have checked.
- Screenshots are required for any visible change, including text, spacing, color, and a new button.
- Each test step includes the expected result.
- Keep the pull request limited to the requested task.

## Example

Branch: `feature/product-category-filter`

Commits:

```
feature/ add category state to the product grid
feature/ highlight the selected category chip
```

Pull request:

```markdown
feature/ add a category filter to the product list

## What was requested

Users need to filter the product list by category so they can find items without scrolling the full catalog.

## What changed

- Added a row of category buttons above the product grid, including "All".
- The list filters in the browser from the products already loaded.
- The selected category stays highlighted until the user picks another one.
- Opening the cart or a product does not clear the filter.

## Implications

- `ProductGrid` now expects the selected category. Any other screen that renders it must pass a category or the list will be empty.
- Product data already has a `category` field. There is no API or database change.
- The cart and the product detail view still use the same product records.

## Screenshots

Before: the full catalog with no category controls.
After: the same page with "Laptops" selected and only laptops visible.
Also include a narrow-window screenshot, because the buttons wrap.

## How to test

- [] Open the home page. Every product is visible and "All" is selected.
- [] Choose "Laptops". Only laptops remain, and that button stays highlighted.
- [] Open a product, close it, and confirm the filter is still "Laptops".
- [] Choose "All". The full list comes back.
- [] Narrow the window. The category buttons stay visible and can still be selected.
```

## Checklist

Before handing work back to the student, confirm:

- The branch name uses a valid tag and a short kebab-case summary.
- Each commit starts with a tag and an imperative summary.
- The pull request title uses the same tag style.
- The pull request has all five sections, in order.
- Implications name shared code, or explicitly say the change is local.
- Screenshots are present when the interface changed.
- A classmate can follow the test steps and know what success looks like.
