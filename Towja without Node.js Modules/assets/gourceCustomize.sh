# Setup Project Name
projName="Towja - Source Code"

# Replace non human readable names with proper ones
sed -i -- 's/berriers@uwstout.edu/Seth Berrier/g' gourceLog.txt
sed -i -- 's/yangw7372@my.uwstout.edu/Will Yang/g' gourceLog.txt
sed -i -- 's/reynoldsn0869@my.uwstout.edu/Nick Reynolds/g' gourceLog.txt
sed -i -- 's/reynoldsn0869@uwstout.edu/Nick Reynolds/g' gourceLog.txt
sed -i -- 's/nicholasreynolds02@gmail.com/Nick Reynolds/g' gourceLog.txt
sed -i -- 's/frasheskid4574@my.uwstout.edu/David Frasheski/g' gourceLog.txt
sed -i -- 's/kozitzaj1075@my.uwstout.edu/Joey Kozitza/g' gourceLog.txt

# Clean up the temporary files from sed
rm gourceLog.txt--
