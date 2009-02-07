
	var startname = "";
	var endname = "";
	var mode_change = false;
	var old_mode = "";
	var new_mode = "";
		if (!file_index)
		{
			file_index++;
			return;
		}

		if (callbacks["newfile"])
			callbacks["newfile"](startname, endname, "file_index_" + (file_index - 1), mode_change, old_mode, new_mode);

		var title = startname;
		var binaryname = endname;
		if (endname == "/dev/null") {
			binaryname = startname;
			title = startname;
		}
		else if (startname == "/dev/null")
			title = endname;
		else if (startname != endname)
			title = startname + " renamed to " + endname;
		
		if (binary && endname == "/dev/null") {	// in cases of a deleted binary file, there is no diff/file to display
			line1 = "";
			line2 = "";
			diffContent = "";
			file_index++;
			startname = "";
			endname = "";
			return;				// so printing the filename in the file-list is enough
		}

		if (diffContent != "" || binary) {
			finalContent += '<div class="file" id="file_index_' + (file_index - 1) + '">' +
				'<div class="fileHeader">' + title + '</div>';
		}

		if (!binary && (diffContent != ""))  {
			if (binary) {
				if (callbacks["binaryFile"])
					finalContent += callbacks["binaryFile"](binaryname);
				else
					finalContent += "<div>Binary file differs</div>";
			}
		if (diffContent != "" || binary)
			finalContent += '</div>';

		file_index++;
		startname = "";
		endname = "";
		if (firstChar == "d" && l.charAt(1) == "i") {			// "diff", i.e. new file, we have to reset everything
			header = true;						// diff always starts with a header
			finishContent(); // Finish last file
			binary = false;
			mode_change = false;
			if(match = l.match(/^diff --git (a\/)+(.*) (b\/)+(.*)$/)) {	// there are cases when we need to capture filenames from
				startname = match[2];					// the diff line, like with mode-changes.
				endname = match[4];					// this can get overwritten later if there is a diff or if
			}								// the file is binary
			if (firstChar == "n") {
				if (l.match(/^new file mode .*$/))
					startname = "/dev/null";

				if (match = l.match(/^new mode (.*)$/)) {
					mode_change = true;
					new_mode = match[1];
				}
			}
			if (firstChar == "o") {
				if (match = l.match(/^old mode (.*)$/)) {
					mode_change = true;
					old_mode = match[1];
				}
				continue;
			}

			if (firstChar == "d") {
				if (l.match(/^deleted file mode .*$/))
					endname = "/dev/null";
				continue;
			}
			if (firstChar == "-") {
				if (match = l.match(/^--- (a\/)?(.*)$/))
					startname = match[2];
				continue;
			}
			if (firstChar == "+") {
				if (match = l.match(/^\+\+\+ (b\/)?(.*)$/))
					endname = match[2];
				continue;
			}
			// If it is a complete rename, we don't know the name yet
			// We can figure this out from the 'rename from.. rename to.. thing
			if (firstChar == 'r')
			{
				if (match = l.match(/^rename (from|to) (.*)$/))
				{
					if (match[1] == "from")
						startname = match[2];
					else
						endname = match[2];
				}
				continue;
			}
			if (firstChar == "B") // "Binary files .. and .. differ"
				// We might not have a diff from the binary file if it's new.
				// So, we use a regex to figure that out

				if (match = l.match(/^Binary files (a\/)?(.*) and (b\/)?(.*) differ$/))
				{
					startname = match[2];
					endname = match[4];
				}
}